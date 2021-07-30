import { IClase, IProfesor, IUser } from "../../../interfaces";
import Clase from "../../models/Clase";
function ClaseToIClase(clase: Clase, userProfesor?: IUser): IClase {
    
    const obj: IClase = {
        descripcion: clase.descripcion,
        grado: clase.grado,
        materia: clase.materia,
        nivel: clase.nivel,
        nombre: clase.nombre,
        precio: clase.precio,
        date: clase.date,
        id: clase.id,
        esPresencial: clase.esPresencial,
        status: clase.status,
        User_mail: clase.User_mail,
        Profesor_mail: clase.Profesor_mail,
        profesor: clase.profesor ? {
            User_mail: userProfesor.User_mail,
            city: userProfesor.city,
            country: userProfesor.country,
            lastName: userProfesor.lastName,
            name: userProfesor.name,
            score: clase.profesor.score,
            state: userProfesor.state,
            description: clase.profesor.description,
            foto: userProfesor.foto,
            howMany: clase.profesor.howMany,
            title: clase.profesor.title
        } : null,
        student: clase.student ? {
            User_mail: clase.User_mail,
            city: clase.student.city,
            country: clase.student.country,
            lastName: clase.student.lastName,
            name: clase.student.name,
            state: clase.student.state,
            foto: clase.student.foto
        } : null
    }
    return obj
}

export default ClaseToIClase