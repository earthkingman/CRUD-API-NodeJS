import passport from "passport";
import Strategy from "passport-local";
const LocalStrategy = Strategy;
import bcrypt from "bcrypt";

import { User } from "../entity/user";

export default () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email: string, password: string, done) => {
                try {
                    const exUser = await User.findOne({ email: email });
                    if (exUser) {
                        const result = await bcrypt.compare(password, exUser.password);
                        if (result) {
                            return done(null, exUser);
                        } else {
                            return done(null, false, { message: "Password Invalid" });
                        }
                    } else {
                        return done(null, false, {
                            message: "Email Invalid",
                        });
                    }
                } catch (error) {
                    console.log(error);
                    return done(error);
                }
            }
        )
    );
};
