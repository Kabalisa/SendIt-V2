"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth_1 = __importDefault(require("passport-google-oauth"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const socialAuthHelpers_1 = require("../helpers/socialAuthHelpers");
const GoogleStrategy2 = passport_google_oauth_1.default.OAuth2Strategy;
const FacebookStrategy = passport_facebook_1.default.Strategy;
const googleStategy = (CLIENTID = 'CLIENTID', CLIENTSECRET = 'CLIENTSECRET', BASEURL = 'BASEURL') => {
    const strategy = new GoogleStrategy2({
        clientID: CLIENTID,
        clientSecret: CLIENTSECRET,
        callbackURL: `${BASEURL}/api/v2/auth/google/callback`,
    }, socialAuthHelpers_1.SocialAuthHelper.verifyCallBack);
    return strategy;
};
exports.googleStategy = googleStategy;
const facebookStrategy = (APPID = 'APPID', APPSECRET = 'APPSECRET', BASEURL = 'BASEURL') => {
    const strategy = new FacebookStrategy({
        clientID: APPID,
        clientSecret: APPSECRET,
        callbackURL: `${BASEURL}/api/v2/auth/facebook/callback`,
        profileFields: ['id', 'email', 'name', 'picture.type(large)'],
    }, socialAuthHelpers_1.SocialAuthHelper.verifyCallBack);
    return strategy;
};
exports.facebookStrategy = facebookStrategy;
//# sourceMappingURL=strategies.js.map