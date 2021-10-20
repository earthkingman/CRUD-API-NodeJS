import express, { Router } from 'express';
import { authRouter } from './auth.router';

const router: Router = express.Router();
router.use('/auth', authRouter);
export const applicationRouter: Router = router;