"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const index_1 = require("../../config/index");
const socialAuthControllers_1 = __importDefault(require("../../controllers/socialAuthControllers"));
const router = express_1.default.Router();
const strategies = new index_1.Strategy();
router.get('/google', passport_1.default.authenticate(strategies.strategyToUse('google'), { scope: ['email', 'profile'] }));
router.get('/google/callback', passport_1.default.authenticate(strategies.strategyToUse('google'), { session: false }), socialAuthControllers_1.default.socialAuth);
router.get('/facebook', passport_1.default.authenticate(strategies.strategyToUse('facebook')));
router.get('/facebook/callback', passport_1.default.authenticate(strategies.strategyToUse('facebook'), { session: false }), socialAuthControllers_1.default.socialAuth);
exports.default = router;
//# sourceMappingURL=auth.js.map