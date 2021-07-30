import { IUser, IProfesor } from "../../../interfaces";

function IUserToIProfesor (user: IUser): IProfesor {
    let obj: IProfesor = {
        User_mail: user.User_mail,
        name: user.name,
        lastName: user.lastName,
        city: user.city,
        foto: user.foto,
        description: user.profesor.description,
        score: user.profesor.score,
        state: user.state,
        country: user.country,
        howMany: user.profesor.howMany,
        title: user.profesor.title
    }
    return obj
}
export default IUserToIProfesor