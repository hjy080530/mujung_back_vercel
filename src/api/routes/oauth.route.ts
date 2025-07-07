import { Router } from 'express';
import passport from '../lib/passport';
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

        const email = user.emails[0].value;
        const user_id = user.id; // 여기가 핵심!

        const token = jwt.sign({ email, user_id }, process.env.JWT_SECRET!, {
            expiresIn: '1d',
        });

        res.redirect(`https://mujung.vercel.app/?token=${token}&email=${email}&user_id=${user_id}`);
    }
);

export default router;