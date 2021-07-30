import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, ForeignKey, PrimaryKey, HasMany, BelongsToMany, Unique } from 'sequelize-typescript';
import Clase from './Clase';
import User from './Usuario';
@Table
export default class Puntuacion extends Model {
    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    usuario!: string;

    @PrimaryKey
    @ForeignKey(() => Clase)
    @Column
    clase!: number;

    @Column
    puntuacion!: number;
    
    @Column
    comentario!: string;

}
