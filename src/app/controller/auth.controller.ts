import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/user';

export class AuthController {
    private readonly users: User[];

    constructor() {

    }
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
}