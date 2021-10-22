import { Request, Response, NextFunction } from 'express';
import { DecodedRequest } from '../definition/decoded_jwt'
import { PostService } from "../service/post.service";

export class PostController {

    private postService: PostService;

    public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
        const postId: number = Number(req.params.id);
        console.log(req.query.id);
        try {
            const exPost = await this.postService.selectPost({ id: postId });
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
            const postInfo = { userId, text, title }
            await this.postService.uploadPost(postInfo);
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
        const userId: number = req.decodedId;
        try {
            const postInfo = { userId, postId };
            const exPost = await this.postService.deletePost({ id: postId });
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
            const postInfo = { postId, text, title }
            const exPost = await this.postService.updatePost(postInfo);
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