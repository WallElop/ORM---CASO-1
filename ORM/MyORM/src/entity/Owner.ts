import {Entity, PrimaryGeneratedColumn, Column, Binary, OneToMany} from "typeorm";
import { Problem } from "./Problem";
import { Design } from "./Design";

@Entity()
export class Owner {

    @PrimaryGeneratedColumn()
    ownerid: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column({type: "varbinary"})
    password: string;

    @Column("bit",{default : () => "'true'"})
    enabled: boolean;

    @Column({type: 'datetime'})
    creationdate: Date;

    @OneToMany(()=>Problem, problem => problem.owner)
    problems: Problem[];
    
    @OneToMany(()=>Design, design => design.owner)
    designs: Design[];
}