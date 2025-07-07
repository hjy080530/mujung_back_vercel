import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: 'https://mujung-back-vercel.vercel.app/oauth/google/callback',
        },
        (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: (error: any, user?: any) => void
        ) => {
            console.log('🟢 GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
            console.log('🟢 accessToken:', accessToken);
            console.log('🟢 profile:', profile);

            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user: any, done) => {
    done(null, user);
});

export default passport;