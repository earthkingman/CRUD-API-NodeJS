import express, { Request, Response, Router, NextFunction } from 'express';
import { PageController } from '../controller/page.controller';
const router: Router = express.Router();
const controller: PageController = new PageController();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await controller.page(req, res, next);
});

router.get('/test', async (req: Request, res: Response, next: NextFunction) => {
    return (res.status(200).json("1"))
});


export const pageRouter: Router = router;