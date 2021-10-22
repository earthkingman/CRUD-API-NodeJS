import { Entity, Column, ManyToOne } from "typeorm";
import { Base } from './base.entity';
import { User } from "./user";
@Entity()
export class Post extends Base {

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToOne(() => User, user => user.post, { onDelete: 'CASCADE' })
    user: User;


}
