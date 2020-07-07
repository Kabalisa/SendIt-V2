"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const strategies_1 = require("./strategies");
const CLIENTID = process.env.GOOGLE_CLIENT_ID;
const CLIENTSECRET = process.env.GOOGLE_CLIENT_SECRET;
const BASEURL = process.env.BASE_URL;
const APPID = process.env.FACEBOOK_APP_ID;
const APPSECRET = process.env.FACEBOOK_APP_SECRET;
class Strategy {
    constructor() {
        this.strategyToUse = (strategy) => {
            if (process.env.NODE_ENV === 'test') {
                this.strategy = `${strategy}-test`;
            }
            else {
                this.strategy = `${strategy}`;
            }
            return this.strategy;
        };
        this.googleStrategy = passport_1.default.use(strategies_1.googleStategy(CLIENTID, CLIENTSECRET, BASEURL));
        this.facebookStrategy = passport_1.default.use(strategies_1.facebookStrategy(APPID, APPSECRET, BASEURL));
        this.strategy = null;
    }
}
exports.Strategy = Strategy;
//# sourceMappingURL=index.js.map