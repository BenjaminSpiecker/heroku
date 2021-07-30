import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, Unique, PrimaryKey, ForeignKey, HasOne, HasMany } from 'sequelize-typescript';

import Profesor from './Profesor';
import { IUser, Horario, IClase } from '../../interfaces';
import Puntuacion from './Puntuacion';
import { ClasePorComprar } from '../../interfaces';
import { Time } from '../../interfaces'
import Reclamo from './Reclamo';


@Table
export default class User extends Model implements IUser {
    @Column({ allowNull: false })
    name!: string;

    @PrimaryKey
    @Unique
    @Column({ allowNull: false })
    User_mail!: string;

    @Column({ allowNull: false })
    lastName!: string;

    @Column
    password!: string;

    @Column 
    role!: number;

    @Column  ({type: DataType.TEXT})
    foto!: string;

    @Column ({allowNull: false})
    country: string;

    @Column ({allowNull: false})
    state:string;

    @Column ({allowNull: false})
    city: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

    @Column
    suspendido!: boolean;
    
    @Column  ({type: DataType.TEXT})
    description!: string;

    @HasOne(() => Profesor)
    profesor!: Profesor;

    @Column({ type: DataType.JSON })
    carrito!: IClase[];

    @Column({ type: DataType.JSON})
    historial!: object[];

    @Column ({type: DataType.JSON})
    calendario!: Horario[];

    @HasMany(() => Puntuacion)
    puntuaciones!: Puntuacion[];

    @HasMany(() => Reclamo, 'denunciante_email')
    denuncias_hechas!: Reclamo[];
    
    @HasMany(() => Reclamo, 'denunciado_email')
    denuncias_recibidas!: Reclamo[];

    @HasMany(() => Reclamo, 'admin_email')
    denuncias_administradas!: Reclamo[];
}