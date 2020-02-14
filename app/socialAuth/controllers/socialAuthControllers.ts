import { UserModel } from '../../models/mongoModels';
import { AuthHelper } from '../../helpers/authHelper';

class SocialAuthController {
    static socialAuth = async (req: any, res: any) => {
        // console.log('inconstroller-=-=', req.user);
        const userExist = await AuthHelper.fetchAUser(UserModel, req.user);

        if (userExist) {
            const { password } = req.user;
            const isValidPassword = await AuthHelper.comparePassword(password, userExist.password);
            if (isValidPassword) {
                const { SECRET } = process.env;
                const token = AuthHelper.tokenGenerator({ email: userExist.email }, SECRET);
                return res.status(200).send({ registrationType: 'user log in', token });
            }
            return res.status(401).send({ errorType: 'user login in error', errorMessage: 'incorrect password' });
        } else {
            const { email } = req.user;
            const { SECRET } = process.env;
            const token = AuthHelper.tokenGenerator({ email }, SECRET);
            const storedUser = { ...req.user, password: AuthHelper.hashPassword(req.user.password) };
            const user = new UserModel(storedUser);
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
    };
}

export default SocialAuthController;
