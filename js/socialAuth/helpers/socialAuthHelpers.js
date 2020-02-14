"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SocialAuthHelper {
}
exports.SocialAuthHelper = SocialAuthHelper;
SocialAuthHelper.verifyCallBack = (accessToken, refreshToken, profile, done) => {
    const { ADMIN_EMAIL } = process.env;
    try {
        const { name, _json } = profile;
        const { familyName, givenName } = name;
        const { picture, email_verified } = _json;
        const user = {
            email: profile.emails ? profile.emails[0].value : '',
            password: profile.id,
            firstName: givenName,
            lastName: familyName,
            provider: profile.provider,
            image: profile.provider === 'google' ? picture : '',
            isVerified: profile.provider === 'google' ? email_verified : false,
            role: profile.emails && profile.emails[0].value === ADMIN_EMAIL ? 'ADMIN' : 'USER',
        };
        return done(null, user);
    }
    catch (error) {
        return done(error, false, { message: error.message });
    }
};
//# sourceMappingURL=socialAuthHelpers.js.map