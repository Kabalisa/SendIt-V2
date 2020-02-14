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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoModels_1 = require("../../models/mongoModels");
const authHelper_1 = require("../../helpers/authHelper");
class SocialAuthController {
}
SocialAuthController.socialAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield authHelper_1.AuthHelper.fetchAUser(mongoModels_1.UserModel, req.user);
    if (userExist) {
        const { password } = req.user;
        const isValidPassword = yield authHelper_1.AuthHelper.comparePassword(password, userExist.password);
        if (isValidPassword) {
            const { SECRET } = process.env;
            const token = authHelper_1.AuthHelper.tokenGenerator({ email: userExist.email }, SECRET);
            return res.status(200).send({ registrationType: 'user log in', token });
        }
        return res.status(401).send({ errorType: 'user login in error', errorMessage: 'incorrect password' });
    }
    else {
        const { email } = req.user;
        const { SECRET } = process.env;
        const token = authHelper_1.AuthHelper.tokenGenerator({ email }, SECRET);
        const storedUser = Object.assign(Object.assign({}, req.user), { password: authHelper_1.AuthHelper.hashPassword(req.user.password) });
        const user = new mongoModels_1.UserModel(storedUser);
        user.save();
        if (user) {
            return res.status(200).send({
                status: 200,
                result: {
                    message: 'user created',
                    token,
                },
            });
        }
        return res.status(500).send({
            status: 500,
            message: 'database error!! user not created',
        });
    }
});
exports.default = SocialAuthController;
//# sourceMappingURL=socialAuthControllers.js.map