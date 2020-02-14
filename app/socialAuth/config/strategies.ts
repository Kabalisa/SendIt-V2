import GoogleStrategy from 'passport-google-oauth';
import facebookstrategy from 'passport-facebook';

import { SocialAuthHelper } from '../helpers/socialAuthHelpers';

const GoogleStrategy2 = GoogleStrategy.OAuth2Strategy;
const FacebookStrategy = facebookstrategy.Strategy;

const googleStategy = (CLIENTID = 'CLIENTID', CLIENTSECRET = 'CLIENTSECRET', BASEURL = 'BASEURL') => {
    const strategy = new GoogleStrategy2(
        {
            clientID: CLIENTID,
            clientSecret: CLIENTSECRET,
            callbackURL: `${BASEURL}/api/v2/auth/google/callback`,
        },
        SocialAuthHelper.verifyCallBack,
    );

    return strategy;
};

const facebookStrategy = (APPID = 'APPID', APPSECRET = 'APPSECRET', BASEURL = 'BASEURL') => {
    const strategy = new FacebookStrategy(
        {
            clientID: APPID,
            clientSecret: APPSECRET,
            callbackURL: `${BASEURL}/api/v2/auth/facebook/callback`,
            profileFields: ['id', 'email', 'name', 'picture.type(large)'],
        },
        SocialAuthHelper.verifyCallBack,
    );

    return strategy;
};

export { googleStategy, facebookStrategy };
