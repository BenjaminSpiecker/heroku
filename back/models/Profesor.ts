import { Table, Model, Column } from "sequelize-typescript";

@Table
export default class Profesor extends Model{
    @Column
    name!: string;

    @Column
    lastName!: string;
}