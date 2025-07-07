import { Router } from 'express';
import passport from '../../lib/passport';
import jwt from "jsonwebtoken";

const router = Router();

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        const user = req.user as any;
        console.log('최종 유저 정보:', user);

        const token = jwt.sign({ email: user.emails[0].value }, process.env.JWT_SECRET!, {
            expiresIn: '1d',
        });

        const email = user.emails[0].value;
        res.redirect(`https://mujung.vercel.app/?token=${token}&email=${email}`);
    }
);

export default router;