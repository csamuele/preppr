import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { getUserByEmail, getUserById, updateUser } from 'Model';


/**
 * Local authentication strategy using email and password.
 * @remarks
 * This strategy is used to authenticate users locally using their email and password.
 * @public
 */
export const localStrategy = new LocalStrategy(
    { usernameField: 'email',
    passwordField: 'password' },
    async (email, password, done) => {
        try {
            const user = await getUserByEmail(email);
            if (user === undefined) {
                return done(null, false, { message: 'Incorrect email' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const updatedUser = await updateUser(user.user_id, { last_login: new Date() });
                return done(null, updatedUser);
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }
        } catch (error) {
            return done(error);
        }
    }
);



passport.serializeUser((user: any, done) => {
    done(null, user.user_id);
});



passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await getUserById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export const authenticate = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Not authenticated' });
}