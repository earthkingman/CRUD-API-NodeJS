import { Request, Response, NextFunction } from 'express';
import { Post } from '../entity/post';
import { PageService } from "../service/page.service"

export class PageController {
    private userService: PageService;
    public async page(req: Request, res: Response, next: NextFunction): Promise<any> {
        const limit = Number(req.query.limit);
        const offset = Number(req.query.offset);
        const pageInfo = { limit, offset }
        try {
            const postList = await this.userService.getQuestionList(pageInfo);
            return res.status(200).json({
                list: postList.postList,
                count: postList.postCount
            });
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