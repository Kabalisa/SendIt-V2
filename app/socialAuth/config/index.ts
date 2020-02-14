import passport from 'passport';
import { googleStategy, facebookStrategy } from './strategies';

const CLIENTID = process.env.GOOGLE_CLIENT_ID;
const CLIENTSECRET = process.env.GOOGLE_CLIENT_SECRET;
const BASEURL = process.env.BASE_URL;
const APPID = process.env.FACEBOOK_APP_ID;
const APPSECRET = process.env.FACEBOOK_APP_SECRET;
export class Strategy {
    googleStrategy: any;
    facebookStrategy: any;
    strategy: string | null;
    constructor() {
        this.googleStrategy = passport.use(googleStategy(CLIENTID, CLIENTSECRET, BASEURL));
        this.facebookStrategy = passport.use(facebookStrategy(APPID, APPSECRET, BASEURL));
        this.strategy = null;
    }

    strategyToUse = (strategy: string) => {
        if (process.env.NODE_ENV === 'test') {
            this.strategy = `${strategy}-test`;
        } else {
            this.strategy = `${strategy}`;
        }
        return this.strategy;
    };
}
