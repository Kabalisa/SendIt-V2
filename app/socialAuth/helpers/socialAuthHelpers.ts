/* eslint-disable @typescript-eslint/camelcase */
export class SocialAuthHelper {
    static verifyCallBack = (accessToken: any, refreshToken: any, profile: any, done: any) => {
        const { ADMIN_EMAIL } = process.env;
        // console.log(profile);

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
        } catch (error) {
            return done(error, false, { message: error.message });
        }
    };
}
