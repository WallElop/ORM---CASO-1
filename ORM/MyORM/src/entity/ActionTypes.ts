import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity} from "typeorm";
import { SolutionsLog } from "./SolutionsLog";
@Entity({name: "sd_actiontypes"})
export class ActionType{

    @PrimaryGeneratedColumn({type: "smallint"})
    actiontypeid: number;

    @Column({type: "varchar",length: 20})
    name: string;

    @Column({type: "varchar",length: 128})
    iconurl: string;

    @OneToMany('SolutionsLog',(solutionlog: SolutionsLog) => solutionlog.actionType)
    solutionlogs: SolutionsLog[];
}