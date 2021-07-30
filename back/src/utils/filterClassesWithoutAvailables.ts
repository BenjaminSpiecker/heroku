import { IClase } from '../../interfaces';
import Clase from '../models/Clase'
import Profesor from '../models/Profesor';
async function filterClassesWithoutAvailables(cl_array: Clase[]): Promise<Clase[]> {
    const professors: Profesor[] =  await Promise.all(cl_array.map(cl => Profesor.findByPk(cl.profesor.User_mail)))
    console.log(professors)
    const professorsWithCalendar = professors.filter(prof => prof.calendario!==null && prof.calendario!==[])
    const filteredClasses = cl_array.filter(cl => professorsWithCalendar.some(prof => prof.User_mail === cl.profesor.User_mail))
    return filteredClasses
}
export default filterClassesWithoutAvailables