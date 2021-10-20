import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { Base } from './base.entity';
import { Post } from "./post"
import bcrypt from "bcrypt";

@Entity()
export class User extends Base {

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Post, post => post.user)
    post: Post[];

    @BeforeInsert()
    async savePassword() {
        if (this.password) {
            const hashedPassword = await bcrypt.hashSync(
                this.password,
                +process.env.SALT_ROUNDS
            );
            this.password = hashedPassword;
        }
    }

    @BeforeUpdate()
    async updatePassword() {
        if (this.password) {
            const hashedPassword = await bcrypt.hashSync(
                this.password,
                +process.env.SALT_ROUNDS
            );
            this.password = hashedPassword;
        }
    }
}
