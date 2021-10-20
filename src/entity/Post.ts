import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn,ManyToOne} from "typeorm";
import {User} from "../entity/user";
@Entity()
export class Post {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    title: string;
  
    @Column()
    text: string;

    @ManyToOne(() => User, user => user.post, { onDelete: 'CASCADE' })
    user: User;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
