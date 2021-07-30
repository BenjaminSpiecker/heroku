import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, ForeignKey, PrimaryKey, HasMany, BelongsToMany, BelongsTo } from 'sequelize-typescript';
import { EnumType } from 'typescript';
import { Claim } from '../../interfaces';
import Clase from './Clase';
import Profesor from './Profesor';
import User from './Usuario';

@Table
export default class Reclamo extends Model {

    @Column
    nombre!: string;

    @ForeignKey(() => User)
    @Column
    denunciante_email!: string;

    @BelongsTo(() => User, 'denunciante_email')
    denunciante!: User;

    @Column ({allowNull: false, type: DataType.JSON})
    reclamo!: string;

    @ForeignKey(() => User)
    @Column
    denunciado_email!: string;

    @BelongsTo(() => User, 'denunciado_email')
    denunciado!: User;

    @ForeignKey(() => User)
    @Column
    admin_email!: string;

    @BelongsTo(() => User, 'admin_email')
    admin!: User;

    @ForeignKey(() => Clase)
    @Column
    clase_id!: number;

    @BelongsTo(() => Clase, 'clase_id')
    clase!: Clase;
}
