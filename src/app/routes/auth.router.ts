import express, { Request, Response, Router, NextFunction } from 'express';
import { AuthController } from '../controller/auth.controller';

const router: Router = express.Router();
const controller: AuthController = new AuthController();

router.post('/signup', async (request: Request, response: Response, next: NextFunction) => {
    await controller.signup(request, response, next);
});

export const authRouter: Router = router;