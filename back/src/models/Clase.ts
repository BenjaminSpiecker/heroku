import { Model, Column, Table, CreatedAt, UpdatedAt, ForeignKey,DataType,  BelongsTo, HasMany, PrimaryKey, Unique, BelongsToMany} from 'sequelize-typescript';
import { Time, Horario, IClase, IProfesor } from '../../interfaces';
import Profesor from './Profesor';
import Puntuacion from './Puntuacion';
import User from './Usuario';
import Reclamo from './Reclamo';
@Table
export default class Clase extends Model {
    @Column
    nombre!: string;

    @Column ({allowNull: false})
    grado!: string;

    @Column
    nivel!: string;

    @Column ({allowNull: false})
    materia!: string;

    @Column
    descripcion!: string;

    @Column 
    esPresencial!: string;

    @Column 
    precio!: string;

    @Column ({type: DataType.JSON})
    date!: {year: number, month: number, day: number, time: Time};

    @ForeignKey(() => Profesor)
    @Column
    Profesor_mail!: string;

    @ForeignKey(() => User)
    @Column
    User_mail!: string;

    @Column ({type: DataType.JSON})
    calendar: Horario[];

    @Column ({allowNull: true})
    status: 'pending' | 'complete' | 'cancelled'

    @BelongsTo(() => Profesor)
    profesor!: Profesor;

    @BelongsTo(() => User)
    student!: User;

    @Column(DataType.FLOAT)
    puntuacion!: number;

    @HasMany(() => Puntuacion)
    puntuaciones!: Puntuacion[];

    @HasMany(() => Reclamo, 'clase_id')
    clase!: Reclamo[];

}
