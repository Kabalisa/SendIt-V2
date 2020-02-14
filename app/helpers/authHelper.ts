/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/no-unused-vars */
///<reference path="../types/nodemailer-sendgrid-transport.d.ts" />;
///<reference path="../types/nodemailer-stub-transport.d.ts" />;

import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import stubTransport from 'nodemailer-stub-transport';
import { send } from '../utilities/mailSender';

export class AuthHelper {
    static tokenGenerator = (info: any, secret = 'socret') => {
        const token = Jwt.sign(info, secret, { expiresIn: '1d' });
        return token;
    };

    static hashPassword = (password: string) => {
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
        return hashedPassword;
    };

    static comparePassword = (password: string, hashPassword: string) => {
        const comparison = bcrypt.compareSync(password, hashPassword);
        return comparison;
    };

    static fetchUsers = (UserModel: any, _?: any, __?: any) => UserModel.find();
    static fetchAUser = async (UserModel: any, input: any) => {
        try {
            return await UserModel.findOne({ email: input.email }, (err: any, user: any) => {
                return user;
            });
        } catch (error) {
            return error.message;
        }
    };

    static validateUserMutation = (email: string) => {
        return `
        mutation {
            validateUser(input: {email:"${email}"}) {
              message
            }
          }
        `;
    };

    static createUser = async (input: any, { UserModel, AuthHelper }: any, _?: any): Promise<string | null> => {
        const userExist = await AuthHelper.fetchAUser(UserModel, input);
        const { email } = input;
        if (userExist) {
            return null;
        } else {
            let result: string;
            try {
                const SECRET = process.env.SECRET;
                const APIURL = process.env.API_URL;
                const { ADMIN_EMAIL } = process.env;
                const MUTATION = AuthHelper.validateUserMutation(email);
                const token = AuthHelper.tokenGenerator({ email }, SECRET);
                const storedInput = {
                    email,
                    password: AuthHelper.hashPassword(input.password),
                    isVerified: false,
                    role: email === ADMIN_EMAIL ? 'ADMIN' : 'USER',
                    provider: 'local',
                };
                const user = new UserModel(storedInput);
                await send(AuthHelper, {
                    email,
                    subject: 'Send-IT Email Verification',
                    html: `<p>click on the following to verify your email <a href='${APIURL}?query=${MUTATION}'>Verify Email</a></p>`,
                });
                user.save();
                result = token;
            } catch (error) {
                result = 'send email failed';
            }
            return result;
        }
    };

    static loginUser = async (input: any, { UserModel, AuthHelper }: any) => {
        const userExist = await AuthHelper.fetchAUser(UserModel, input);
        const SECRET = process.env.SECRET;
        const token = AuthHelper.tokenGenerator({ email: input.email }, SECRET);
        const isPasswordCorrect = AuthHelper.comparePassword(input.password, userExist.password);
        const result = isPasswordCorrect
            ? { registrationType: 'user log in', token }
            : { errorType: 'user login in error', errorMessage: 'incorrect password' };
        return result;
    };

    static deleteUser = async (input: any, { UserModel }: any, _?: any) => {
        const userExist = await AuthHelper.fetchAUser(UserModel, input);
        if (userExist) {
            const { email } = userExist;
            const deletedUser = await UserModel.deleteOne({ email: input.email });
            return deletedUser.deletedCount === 1 ? email : null;
        } else {
            return null;
        }
    };

    static emailTransport = (APIKEY: string) => {
        const options = {
            auth: {
                api_key: APIKEY,
            },
        };

        const NODEENV = process.env.NODE_ENV;

        const tranport =
            NODEENV === 'test' && APIKEY === 'TESTAPIKEY'
                ? sgTransport(options)
                : NODEENV === 'test'
                ? stubTransport()
                : sgTransport(options);
        return nodemailer.createTransport(tranport);
    };

    static validateUser = async (input: any, { UserModel, AuthHelper }: any) => {
        const userExist = await AuthHelper.fetchAUser(UserModel, input);
        const error = 'error!!. user validation failed';
        if (userExist) {
            const { email } = userExist;
            const result = await UserModel.updateOne({ email }, { isVerified: true });
            const verifiedUser =
                result.nModified === 1 ? { message: 'user verified successfully' } : { message: error };
            return verifiedUser;
        } else {
            return { message: error };
        }
    };

    static decodeToken = (token: any) => {
        return (secret = 'socret') => {
            const decoded = Jwt.verify(token, secret);
            return decoded;
        };
    };
}
