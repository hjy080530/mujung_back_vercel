import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
const GoogleStrategyTyped = GoogleStrategy as unknown as passport.Strategy;
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: 'https://mujung-back-vercel.vercel.app/oauth/google/callback',
        },
        (accessToken: string, refreshToken: string, profile: Profile, done) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user as any);
});

export default passport;