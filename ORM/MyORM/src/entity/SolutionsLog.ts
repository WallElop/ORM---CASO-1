import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn} from "typeorm";
import { ActionType } from "./ActionTypes";
import { Solution } from "./Solution";

@Entity({name: "sd_solutionslog"})
export class SolutionsLog {

    @PrimaryGeneratedColumn({type: "bigint"})
    solutionlogid: number;

    @CreateDateColumn({type: 'datetime'})
    posttime: Date;

    @ManyToOne(()=>ActionType, actionTyes=>actionTyes.solutionlogs)
    @JoinColumn({name: "actiontypeid"})
    actionType: ActionType;

    @ManyToOne(() => Solution , solution => solution.solutionLogs)
    @JoinColumn({name: "solutionid"})
    solution: Solution;

}