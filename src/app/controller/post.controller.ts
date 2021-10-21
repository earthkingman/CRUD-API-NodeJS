import { Request, Response, NextFunction } from 'express';
import { DecodedRequest } from '../definition/decoded_jwt'
import { Post } from '../entity/post';
import { User } from '../entity/user';

export class PostController {

    public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
        const postId: number = Number(req.params.id);
        console.log(req.query.id);
        try {
            const exPost = await Post.findOne({ id: postId });
            console.log(exPost);
            return res.status(200).json({
                data: exPost
            })
        } catch (error) {
            return res.status(404).json({
                result: false,
                message: `An error occurred (${error.message})`
            })
        }
    }
    public async post(req: DecodedRequest, res: Response, next: NextFunction): Promise<any> {
        const userId: number = req.decodedId;
        const { title, text } = req.body;
        try {
            const exUser = await User.findOne({ id: userId });
            const post = await Post.create({ title: title, text: text, user: exUser });
            await post.save();
            return res.status(200).json({
                result: true,
                message: "Upload Success"
            })
        }
        catch (error) {
            console.log(error);
            return res.status(404).json({
                result: false,
                message: `An error occurred (${error.message})`
            })
        }
    }

    public async delete(req: DecodedRequest, res: Response, next: NextFunction): Promise<any> {
        const postId: number = Number(req.params.id);
        try {
            const exPost = await Post.delete({ id: postId });
            return res.status(200).json({
                result: true,
                message: "Delete Success"
            })
        } catch (error) {
            return res.status(404).json({
                result: false,
                message: `An error occurred (${error.message})`
            })
        }
    }
    public async patch(req: DecodedRequest, res: Response, next: NextFunction): Promise<any> {
        const postId: number = Number(req.params.id);
        const { text, title } = req.body;
        try {
            const exPost = await Post.findOne({ id: postId });
            exPost.text = text || exPost.text;
            exPost.title = title || exPost.title;
            await exPost.save();
            return res.status(200).json({
                result: true,
                message: "Update Success"
            })
        } catch (error) {
            return res.status(404).json({
                result: false,
                message: `An error occurred (${error.message})`
            })
        }
    }

}