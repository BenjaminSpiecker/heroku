import { IClase } from "../../../interfaces";
import Clase from "../../models/Clase";
import Profesor from "../../models/Profesor";
import User from "../../models/Usuario";
import ClaseToIClase from "./ClaseToIClase";

async function BuildClaseToIClase (claseWithIncludeUserAndProfessor: Clase): Promise<IClase> {
    try {
        const professor = claseWithIncludeUserAndProfessor.Profesor_mail ? await User.findByPk(claseWithIncludeUserAndProfessor.Profesor_mail, {include: Profesor}) : null
        return ClaseToIClase(claseWithIncludeUserAndProfessor, professor)
    } catch(err) {
        return err
    }
}
export default BuildClaseToIClase