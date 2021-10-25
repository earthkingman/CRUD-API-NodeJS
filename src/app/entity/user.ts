import { Entity, Column, OneToMany } from "typeorm";
import { Base } from './base.entity';
import { Post } from "./post"
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
}
