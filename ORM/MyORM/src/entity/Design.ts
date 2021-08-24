import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { Solution } from "./Solution";
import { Owner } from "./Owner";

@Entity()
export class Design {

    @PrimaryGeneratedColumn()
    designid: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({type: 'datetime'})
    creationdate: Date;

    @Column({type: 'datetime'})
    publishdate: Date;

    @Column("bit",{default : () => "'true'"})
    active: boolean;

    @OneToMany(()=>Solution, solution=>solution.problem)
    solutions: Solution[];

    @ManyToOne(() => Owner, owner => owner.problems)
    owner: Owner

}