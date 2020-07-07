"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_sendgrid_transport_1 = __importDefault(require("nodemailer-sendgrid-transport"));
const nodemailer_stub_transport_1 = __importDefault(require("nodemailer-stub-transport"));
const mailSender_1 = require("../utilities/mailSender");
class AuthHelper {
}
exports.AuthHelper = AuthHelper;
AuthHelper.tokenGenerator = (info, secret = 'socret') => {
    const token = jsonwebtoken_1.default.sign(info, secret, { expiresIn: '1d' });
    return token;
};
AuthHelper.hashPassword = (password) => {
    const hashedPassword = bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync(8));
    return hashedPassword;
};
AuthHelper.comparePassword = (password, hashPassword) => {
    const comparison = bcryptjs_1.default.compareSync(password, hashPassword);
    return comparison;
};
AuthHelper.fetchUsers = (UserModel, _, __) => UserModel.find();
AuthHelper.fetchAUser = (UserModel, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield UserModel.findOne({ email: input.email }, (err, user) => {
            return user;
        });
    }
    catch (error) {
        return error.message;
    }
});
AuthHelper.validateUserMutation = (email) => {
    return `
        mutation {
            validateUser(input: {email:"${email}"}) {
              message
            }
          }
        `;
};
AuthHelper.createUser = (input, { UserModel, AuthHelper }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield AuthHelper.fetchAUser(UserModel, input);
    const { email } = input;
    if (userExist) {
        return null;
    }
    else {
        let result;
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
            yield mailSender_1.send(AuthHelper, {
                email,
                subject: 'Send-IT Email Verification',
                html: `<p>click on the following to verify your email <a href='${APIURL}?query=${MUTATION}'>Verify Email</a></p>`,
            });
            user.save();
            result = token;
        }
        catch (error) {
            result = 'send email failed';
        }
        return result;
    }
});
AuthHelper.loginUser = (input, { UserModel, AuthHelper }) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield AuthHelper.fetchAUser(UserModel, input);
    const SECRET = process.env.SECRET;
    const token = AuthHelper.tokenGenerator({ email: input.email }, SECRET);
    const isPasswordCorrect = AuthHelper.comparePassword(input.password, userExist.password);
    const result = isPasswordCorrect
        ? { registrationType: 'user log in', token }
        : { errorType: 'user login in error', errorMessage: 'incorrect password' };
    return result;
});
AuthHelper.deleteUser = (input, { UserModel }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield AuthHelper.fetchAUser(UserModel, input);
    if (userExist) {
        const { email } = userExist;
        const deletedUser = yield UserModel.deleteOne({ email: input.email });
        return deletedUser.deletedCount === 1 ? email : null;
    }
    else {
        return null;
    }
});
AuthHelper.emailTransport = (APIKEY) => {
    const options = {
        auth: {
            api_key: APIKEY,
        },
    };
    const NODEENV = process.env.NODE_ENV;
    const tranport = NODEENV === 'test' && APIKEY === 'TESTAPIKEY'
        ? nodemailer_sendgrid_transport_1.default(options)
        : NODEENV === 'test'
            ? nodemailer_stub_transport_1.default()
            : nodemailer_sendgrid_transport_1.default(options);
    return nodemailer_1.default.createTransport(tranport);
};
AuthHelper.validateUser = (input, { UserModel, AuthHelper }) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield AuthHelper.fetchAUser(UserModel, input);
    const error = 'error!!. user validation failed';
    if (userExist) {
        const { email } = userExist;
        const result = yield UserModel.updateOne({ email }, { isVerified: true });
        const verifiedUser = result.nModified === 1 ? { message: 'user verified successfully' } : { message: error };
        return verifiedUser;
    }
    else {
        return { message: error };
    }
});
AuthHelper.decodeToken = (token) => {
    return (secret = 'socret') => {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    };
};
//# sourceMappingURL=authHelper.js.map