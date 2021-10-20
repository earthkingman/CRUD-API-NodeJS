import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Base } from './base.entity';
import { Post } from "./post"
import { Token } from "./token"
import bcrypt from "bcrypt";
@Entity()
export class User extends Base {

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToOne(() => Token)
    @JoinColumn()
    token: Token;

    @OneToMany(() => Post, post => post.user)
    post: Post[];

    @BeforeInsert()
    async savePassword() {
        if (this.password) {
            const hashedPassword = await bcrypt.hashSync(this.password, 10);
            this.password = hashedPassword;
        }
    }

    @BeforeUpdate()
    async updatePassword() {
        if (this.password) {
            const hashedPassword = await bcrypt.hashSync(this.password, 10);
            this.password = hashedPassword;
        }
    }
}
