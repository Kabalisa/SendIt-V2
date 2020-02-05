/* eslint-disable @typescript-eslint/no-unused-vars */
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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
        if (input.email) {
            return await UserModel.findOne({ email: input.email }, (err: any, user: any) => {
                return user;
            });
        } else {
            return null;
        }
    };

    static createUser = async (input: any, { UserModel, AuthHelper }: any, _?: any): Promise<string | null> => {
        const userExist = await AuthHelper.fetchAUser(UserModel, input);
        if (userExist) {
            return null;
        } else {
            const SECRET = process.env.SECRET;
            const token = AuthHelper.tokenGenerator({ email: input.email }, SECRET);
            const storedInput = {
                email: input.email,
                password: AuthHelper.hashPassword(input.password),
                token,
            };
            const user = new UserModel(storedInput);
            user.save();
            return token;
        }
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
}
