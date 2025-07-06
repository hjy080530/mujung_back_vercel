import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/google', (req, res, next) => {
  const from = req.query.from || '/';
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: from
  })(req, res, next);
});

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login/fail',
  session: false,
}), (req, res) => {
  const from = req.query.state || '/';
  res.redirect(`https://localhost:5173/${from}`);
});

export default router;
