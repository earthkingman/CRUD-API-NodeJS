import { getConnection, QueryRunner, Repository } from "typeorm";

import { Post } from "../entity/post";

export class PageService {
    private queryRunner: QueryRunner;
    private postRepository: Repository<Post>;

    constructor() {
        this.queryRunner = getConnection().createQueryRunner();
        this.postRepository = this.queryRunner.manager.getRepository(Post);
    }

    async getPostList(pageInfo) {
        const postList = await
            this.postRepository
                .createQueryBuilder('post')
                .select(['post', 'user.email'])
                .innerJoin('post.user', 'user')
                .orderBy('post.id', 'DESC')
                .limit(pageInfo.limit)
                .offset(pageInfo.offset)
                .disableEscaping()
                .getMany()
        const postCount = await
            this.postRepository
                .count();
        return { postList, postCount };
    }

}