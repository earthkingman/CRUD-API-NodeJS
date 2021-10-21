import express, { Router } from 'express';
import { authRouter } from './auth.router';
import { postRouter } from './post.router';

const router: Router = express.Router();
router.use('/auth', authRouter);
router.use('/post', postRouter)
export const applicationRouter: Router = router;