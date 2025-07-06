import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  state: '/'
}));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login/fail',
  session: false,
}), (req, res) => {
  const from = req.query.state || '/';
  res.redirect(`https://mujung-three.vercel.app${from}`);
});

export default router;
