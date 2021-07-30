interface IUser {
    name: string;
    lastName: string;
    User_mail: string;
    role?: number;
    country: string;
    state: string;
    city: string;
    foto?: string;
    password?: string;
    profesor?: {
        description: string;
        score: number;
        howMany: number;
        title: string;
    };

}
// En el file Calendar.js hay un Role admin no importado seteado en 2. Considerarlo si cambia Role
enum Role {USER, PROFESSOR, ADMIN}
type Time = [`${number}${number}:${number}${number}:00`, `${number}${number}:${number}${number}:00`]
type ArrayDePares = Time[]

interface ClasePorComprar {
    id: number;
    imagen: string;
    nombre: string;
    precioDescuento: number;
    dia: `${number}${number}/${number}${number}/${number}${number}${number}${number}`;
    horaInicio: `${number}${number}:${number}${number} ${'PM' | 'AM'}`;
    horaFin: `${number}${number}:${number}${number} ${'PM' | 'AM'}`;
    profesor: string;
}

interface Disponible{
    email: string;
    fecha: {
        anio: number,
        mes: number,
        dia: number
    };
    disponible: ArrayDePares;
}
interface Ocupado {
    email: string;
    fecha: {
        anio: number,
        mes: number,
        dia: number
    };
    ocupado: ArrayDePares;
}
type Horario = Disponible & Ocupado

type CalendarioResponse = Horario[]


interface IClase{
    id?: number;
    nombre: string;
    grado: string;
    nivel: string;
    materia: string;
    descripcion: string;
    status?: 'pending' | 'complete' | 'cancelled'
    date?: {year: number, month: number, day: number, time: Time}
    profesor?: IProfesor
    student?: IUser;
    precio: number|string;
    Profesor_mail?: string;
    User_mail?: string;
    esPresencial: string;
}
type DisponibleOcupadoTransform = {disponible: Disponible, ocupado: Ocupado}


interface IProfesor extends IUser {
    description?: string;
    title?: string;
    score: number;
    howMany?: number;
    
}

interface IUserResponse extends IUser {
    updatedAt: string;
    createdAt: string;
    role: null | number;
    foto: null | string;
    carrito: null | [];
}


interface Claim {
    denunciante_email: string,
    denunciado_email: string,
    nombre: string,
    reclamo: string,
    admin_email?: string,
    clase_id?: number,
}

interface Week {
    day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
    disponible: ArrayDePares;
}

type IDate = {year: number, month: number, day: number}

type IPublish = {clase: IClase, agenda: {week: Week[], sundayStartsOn: IDate, forHowLong: number}}

type ArrayOfIUserResponse = IUserResponse[]

export type {ArrayDePares, Disponible, Ocupado, CalendarioResponse, Horario, Time, DisponibleOcupadoTransform, IClase, ClasePorComprar, IProfesor, IUser, IUserResponse, ArrayOfIUserResponse, Claim, Week, IDate, IPublish}

export {Role}
