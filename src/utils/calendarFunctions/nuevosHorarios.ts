import flatInline from "./flatInline"
import { Horario, Disponible, Ocupado, DisponibleOcupadoTransform } from "../../../interfaces"
import {parseToIntTuples, parseToStringTuples} from "../parseString"
import squashTakenWithAvailable from './squashTakenWithAvailable'
const nuevosHorarios = (horariosActuales: Horario, queryDisponible?: Disponible, queryOcupado?: Ocupado): Horario => {

    let newHorario: Horario = {
        disponible: null,
        email: horariosActuales.email,
        fecha: {
            anio: horariosActuales.fecha.anio,
            dia: horariosActuales.fecha.dia,
            mes: horariosActuales.fecha.mes
        },
        ocupado: null
    }
    
    if (queryDisponible){
        
        newHorario.disponible = horariosActuales.disponible ? flatInline([...horariosActuales.disponible.map(parseToIntTuples), ...queryDisponible.disponible.map(parseToIntTuples)]).map(parseToStringTuples) : queryDisponible.disponible
        
        if (horariosActuales.ocupado) {
            const available: [number, number][] = newHorario.disponible.map(parseToIntTuples)
            const taken : [number, number][] = horariosActuales.ocupado.map(parseToIntTuples)
            newHorario.ocupado = squashTakenWithAvailable(available, taken).map(parseToStringTuples)
            if (newHorario.ocupado.length === 0) newHorario.ocupado = null 
        } 

    } else if (queryOcupado) {
        
        newHorario.ocupado = horariosActuales.ocupado ? flatInline([...horariosActuales.ocupado.map(parseToIntTuples), ...queryOcupado.ocupado.map(parseToIntTuples)]).map(parseToStringTuples) : queryOcupado.ocupado
        
        if (horariosActuales.disponible) {
            const available: [number, number][] = horariosActuales.disponible.map(parseToIntTuples)
            const taken: [number, number][] = newHorario.ocupado.map(parseToIntTuples)

            newHorario.disponible = squashTakenWithAvailable(taken, available).map(parseToStringTuples)
            if (newHorario.disponible.length === 0) newHorario.disponible = null 
        
            
        } 
    }
    return newHorario
}
export default nuevosHorarios
