import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Base } from './base.entity';
import { Post } from "./post"
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
@Entity()
export class User extends Base {

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 0 })
    token: string;

    @OneToMany(() => Post, post => post.user)
    post: Post[];

    async signup(email, password) {
        try {
            const exUser: User = await User.findOne({ email });

            if (exUser) {
                return exUser
            }
            else {
                const user = await User.create({ email, password });
                await user.save();
                return user;
            }
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    @BeforeInsert()
    async savePassword() {
        if (this.password) {
            const hashedPassword = await bcrypt.hashSync(this.password, +process.env.SALT_ROUNDS);
            this.password = hashedPassword;
        }
    }
}
