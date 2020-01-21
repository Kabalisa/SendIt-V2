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
    if (input.email) {
        return yield UserModel.findOne({ email: input.email }, (err, user) => {
            return user;
        });
    }
    else {
        return null;
    }
});
AuthHelper.createUser = (input, { UserModel, AuthHelper }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield AuthHelper.fetchAUser(UserModel, input);
    if (userExist) {
        return null;
    }
    else {
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
//# sourceMappingURL=authHelper.js.map