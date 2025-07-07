import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

function generateJwt(user: any) {
    return jwt.sign(
        {
            email: user.emails[0].value,
            name: user.displayName,
        },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );
}

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: '/'
}));

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        const user = req.user as any;
        console.log('유저 정보:', user);

        const email = user.emails[0].value;
        const token = generateJwt(user);

        res.redirect(`https://mujung-three.vercel.app/?token=${token}&email=${email}`);
    }
);

export default router;