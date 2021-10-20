import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn,OneToMany} from "typeorm";
import {Post} from "../entity/Post"
@Entity()
export class User {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    email: string;
  
    @Column()
    password: string;

    @OneToMany(() => Post, post => post.user)
    post: Post[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
