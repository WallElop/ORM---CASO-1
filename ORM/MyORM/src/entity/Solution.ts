import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinTable, JoinColumn} from "typeorm";
import { SolutionsLog } from "./SolutionsLog";
import { Problem } from "./Problem";
import { Design } from "./Design";

@Entity()
export class Solution {

    @PrimaryGeneratedColumn()
    solutionid: number;

    @Column({type: "varchar",length: 2000})
    comments: string;

    @Column({type: 'datetime'})
    posttime: Date;

    @Column("bit",{default : () => "'true'"})
    active: boolean;

    @OneToMany(() => SolutionsLog, solutionLog => solutionLog.solution)
    solutionLogs: SolutionsLog[];

    @ManyToOne(()=>Problem, problem=>problem.solutions)
    @JoinColumn({name: "problemid"})
    problem: Problem;

    @ManyToOne(()=>Design, design=>design.solutions)
    @JoinColumn({name: "designid"})
    design: Design;

}