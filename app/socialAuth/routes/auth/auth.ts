import express from 'express';
import passport from 'passport';

import { Strategy } from '../../config/index';
import SocialAuthController from '../../controllers/socialAuthControllers';

const router = express.Router();

const strategies = new Strategy();

router.get('/google', passport.authenticate(strategies.strategyToUse('google'), { scope: ['email', 'profile'] }));
router.get(
    '/google/callback',
    passport.authenticate(strategies.strategyToUse('google'), { session: false }),
    SocialAuthController.socialAuth,
);

router.get('/facebook', passport.authenticate(strategies.strategyToUse('facebook')));
router.get(
    '/facebook/callback',
    passport.authenticate(strategies.strategyToUse('facebook'), { session: false }),
    SocialAuthController.socialAuth,
);
// router.get('/facebook/callback', () => {
//     console.log('wtf');
// });

export default router;
