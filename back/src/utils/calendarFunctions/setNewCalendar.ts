import { Disponible, Horario } from "../../../interfaces"
import Profesor from "../../models/Profesor"
import nuevosHorarios from './nuevosHorarios'

async function setNewCalendar(query: Disponible){

    let query_disponible_1
        let query_disponible_2
        if ( query.disponible) {
            query_disponible_1 = query.disponible[0][0].substring(0, 2) + query.disponible[0][0].substring(3, 5) + query.disponible[0][0].substring(6, 8)
            query_disponible_2 = query.disponible[0][1].substring(0, 2) + query.disponible[0][1].substring(3, 5) + query.disponible[0][1].substring(6, 8)

            if(query.disponible && query_disponible_1 < "0" && query_disponible_1 > "240000"  || query_disponible_2 < "0" && query_disponible_2 > "240000" || query_disponible_2 < query_disponible_1) return "El horario disponible es incorrecto"
            if ( query.disponible && query.disponible[0][0].substring(0,2) < "00" || query.disponible[0][1].substring(0,2) > "24") return "El horario disponible es incorrecto"
        }
        try {
            let profesor = await Profesor.findOne({
                where: {
                    User_mail: query.email
                }
            })
            if (profesor) {
                
                if (profesor.calendario) {
                    const indice = profesor.calendario.findIndex(element => element.fecha.anio === query.fecha.anio && element.fecha.mes === query.fecha.mes && element.fecha.dia === query.fecha.dia)

                    const calendario = profesor.calendario[indice]

                    if (calendario) {
                        
                        const resultado: Horario = nuevosHorarios(calendario, query)

                        const nuevoCalendario = profesor.calendario.map((e, i) => i === indice ? resultado : e)

                        profesor.set({
                            ...profesor,
                            calendario: nuevoCalendario,
                            history:nuevoCalendario
                        })
                        let calendarioEditado = await profesor.save()
                        
                        return calendarioEditado
                    }
                    else {
                        profesor.set({
                            ...profesor,
                            calendario: [
                                ...profesor.calendario,
                                {
                                    email: query.email,
                                    fecha: query.fecha,
                                    disponible: query.disponible ? query.disponible : null,
                                    ocupado: null
                                }
                            ],
                            history:[
                                ...profesor.history,
                                {
                                    email: query.email,
                                    fecha: query.fecha,
                                    disponible: query.disponible ? query.disponible : null,
                                    ocupado: null
                                }
                            ]
                        })
                        let calendarioEditado = await profesor.save()
                        return calendarioEditado
                    }
                }
                else {
                    
                    profesor.set({
                        ...profesor,
                        calendario: [
                            {
                                email: query.email,
                                fecha: query.fecha,
                                disponible: query.disponible ? query.disponible : null,
                                ocupado: null,
                            }
                        ],
                        history: [
                            {
                                email: query.email,
                                fecha: query.fecha,
                                disponible: query.disponible ? query.disponible : null,
                                ocupado: null,
                            }
                        ]
                    })
                    let calendarioEditado = await profesor.save()
                    return calendarioEditado
                }
            }
        }
        catch (error) {
            
            return error
        }
}
export default setNewCalendar