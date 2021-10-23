import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserService } from "../service/user.service"
dotenv.config();

const secret = process.env.TOKEN_SECRET_KEY;

const accessSign: jwt = (user) => {
    const payload = {
        id: user.id,
    };
    return jwt.sign(payload, secret, {
        expiresIn: "5m",
    });
}

const accessVerify = (access_token: string) => {
    let decoded = null;
    try {
        decoded = jwt.verify(access_token, secret);
        return {
            ok: true,
            id: decoded.id,
        };
    } catch (error) {
        return {
            ok: false,
            message: error.message,
        };
    }
}

const refreshSign = () => {
    return jwt.sign({}, secret, {
        expiresIn: "14d",
    });
}

const refreshVerify = async (refresh_token, userId) => {
    const userService = new UserService();
    const exUser = await userService.findUserById(userId);
    try {
        if (refresh_token === exUser.token) {
            try {
                jwt.verify(refresh_token, secret);
                return true;
            } catch (err) {
                console.log(err.message);
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const jwtUtil = { accessSign, accessVerify, refreshSign, refreshVerify };