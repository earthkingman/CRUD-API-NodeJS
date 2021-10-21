import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/user';
import { jwtUtil } from "../jwt-util/jwt-utils";
import jwt from 'jsonwebtoken';
import passport from "passport"
export class AuthController {

    public async signup(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { email, password } = req.body;
        try {
            const exUser: User = await User.findOne({ email });

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
        passport.authenticate("local", async (authError, userId, info) => {
            if (authError || userId == false) {
                return res.status(400).json({ message: info.message });
            }
            const accessToken = jwtUtil.accessSign(userId);
            const refreshToken = jwtUtil.refreshSign();
            const exUser: User = await User.findOne({ id: userId.id });
            exUser.token = refreshToken;
            await exUser.save();
            res.cookie("refresh", refreshToken, {
                maxAge: 60000 * 60 * 24 * 14,
                httpOnly: true,
            });
            res.cookie("authorization", accessToken, {
                maxAge: 60000 * 30,
                httpOnly: true,
            });
            return res.status(200).json({
                message: "로그인 성공 쿠키에 refreshToken, accessToken 저장 ",
            });
        })(req, res, next);
    }

    public async refresh(req: Request, res: Response, next: NextFunction): Promise<any> {
        const refresh_token = req.cookies.authorization;;
        const access_token = req.cookies.authorization;
        if (refresh_token && access_token) {
            const authResult = jwtUtil.accessVerify(access_token);
            const decoded = jwt.decode(access_token);
            if (decoded === null) {
                res.status(401).json({
                    ok: false,
                    message: 'No authorized'
                })
            }
            const refreshResult = await jwtUtil.refreshVerify(refresh_token, decoded.id);
            if (authResult.ok === false && authResult.message === 'jwt expired') {
                if (refreshResult === false) {
                    res.status(401).json({
                        ok: false,
                        message: 'No authorized'
                    })
                }
                else {
                    const newAccesToken = jwtUtil.accessSign(decoded);
                    res.cookie('authorization', newAccesToken, {
                        maxAge: 60000 * 30,
                        httpOnly: true
                    });
                    res.status(200).json({
                        "message": "AccessToken 재발급"
                    })
                }
            }
            else {
                res.status(400).json({
                    message: 'Acess token is not expired!',
                })
            }
        }
        else {
            res.status(400).json({
                ok: false,
                message: 'Access token and refresh token are need for refresh!',
            });
        }
    }

}