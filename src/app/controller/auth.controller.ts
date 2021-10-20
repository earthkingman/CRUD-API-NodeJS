import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/user';
import { jwtUtil } from "../jwt-util/jwt-utils";
import passport from "passport"
export class AuthController {

    public async signup(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { email, password } = req.body;
        try {
            const exUser: User = await User.findOne({ email });
            console.log(exUser)
            if (exUser) {
                return res.status(400).json({
                    result: false,
                    message: "duplicated email",
                });
            }
            else {
                const user = await User.create({ email, password });
                await user.save();
                return res.status(200).json({
                    result: true,
                    message: "signup successful",
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({
                result: false,
                message: `An error occurred (${error.message})`,
            });
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        passport.authenticate("local", (authError, userId, info) => {
            if (authError || userId == false) {
                return res.status(400).json({ message: info.message });
            }
            const accessToken = jwtUtil.accessSign(userId);
            const refreshToken = jwtUtil.refreshSign();
            res.cookie("authorization", accessToken, {
                maxAge: 60000 * 30,
                httpOnly: true,
            });
            return res.status(200).json({
                refreshToken: refreshToken,
            });
        })(req, res, next);
    }
}