import { getConnection, QueryRunner, Repository } from "typeorm";
import { User } from "../entity/user";

export class UserService {
    private queryRunner: QueryRunner;
    private userRepository: Repository<User>;

    constructor() {
        this.queryRunner = getConnection().createQueryRunner();
        this.userRepository = this.queryRunner.manager.getRepository(User);
    }

    async findUserByEmail(email: string) {
        const user = await this.userRepository
            .findOne({ where: { email: email } });
        return user;
    }

    async findUserById(id: number) {
        const user = await this.userRepository
            .findOne({ where: { id: id } });
        return user;
    }

    async loginRefreshToken(userInfo) {
        const { userId, refreshToken } = userInfo
        const user = await this.userRepository
            .findOne({ where: { id: userId } });
        await this.userRepository.save(userInfo);
    }

    async createUser(createUserInfo) {
        const { email } = createUserInfo;
        const user = await this.userRepository
            .findOne({ where: { email: email } });
        if (user) {
            return { exUser: user, newUser: undefined };
        }
        const newUser = await this.userRepository.save(createUserInfo);
        return { exUser: undefined, newUser: newUser };
    }
}
