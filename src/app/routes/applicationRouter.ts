import express, { Router } from 'express';
import { authRouter } from './auth.router';
import { postRouter } from './post.router';
import { pageRouter } from './page.router';

const router: Router = express.Router();
router.use('/auth', authRouter);
router.use('/post', postRouter);
router.use('/page', pageRouter);
export const applicationRouter: Router = router;