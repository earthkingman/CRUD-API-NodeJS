import { Entity, Column } from "typeorm";
import { Base } from './base.entity';
@Entity()
export class Token extends Base {

    @Column()
    token: string;
}
