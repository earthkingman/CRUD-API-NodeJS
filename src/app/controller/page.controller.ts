import { Request, Response, NextFunction } from 'express';
import { Post } from '../entity/post';

export class PageController {

    public async page(req: Request, res: Response, next: NextFunction): Promise<any> {
        const limit = Number(req.query.limit);
        const offset = Number(req.query.offset);

        try {
            const postList = await Post
                .createQueryBuilder('post')
                .select(['post', 'user.email'])
                .innerJoin('post.user', 'user')
                .orderBy('post.id', 'DESC')
                .limit(limit)
                .offset(offset)
                .disableEscaping()
                .getMany()
            const count = await Post
                .count();
            console.log(postList);
            return res.status(200).json({
                list: postList,
                count: count
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