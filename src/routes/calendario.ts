import { Request, Response, Router } from 'express'
import Profesor from '../models/Profesor'
import { CalendarioResponse, Horario, Disponible, Ocupado } from '../../interfaces';
import nuevosHorarios from '../utils/calendarFunctions/nuevosHorarios';
import validateToken from '../utils/validateToken';
import setNewCalendar from '../utils/calendarFunctions/setNewCalendar';
import User from '../models/Usuario';
import weeklyToMonthlyCalendar from '../utils/calendarFunctions/weeklyToMonthlyCalendar';
const router = Router()

interface MiddlewareRequest extends Request {
    data: {mail: string, role: number};
}

router.post('/add', validateToken, async (req: MiddlewareRequest, res: Response) => {
    let query: Disponible = req.body
    
    if (req.data.role !== 2 && req.body.email != req.data.mail) {
        return res.status(400).send('You are not authorized.')
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
                        calendario: nuevoCalendario
                    })
                    let calendarioEditado = await profesor.save()
                    
                    res.send(calendarioEditado)

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
                        ]
                    })
                    let calendarioEditado = await profesor.save()
                    return res.send(calendarioEditado)
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
                    ]
                })
                let calendarioEditado = await profesor.save()
                return res.send(calendarioEditado)
            }
        }
    }
    catch (error) {
        
        return res.send(error)
    }
});


router.get('/:usuario', async (req: Request, res: Response) => {
    const { usuario } = req.params

    try {
        console.log(usuario)
        if (usuario) {
            const user = await User.findByPk(usuario)
            console.log(user)
            const profesor = await Profesor.findOne({
                where: {
                    User_mail: usuario
                }
            })
            console.log(profesor)
            if (profesor) {
                if (profesor.calendario) {
                    return res.send(profesor.calendario)
                } else {
                    return res.send([])
                }
            } else if (!profesor && usuario){
                return res.send(user.calendario)
            }
        }
    }
    catch (error) {
        res.send(error)
    }
});

router.post('/editTaken', async (req:Request, res:Response) => {
    const query: Ocupado = req.body
    

        const profesor = await Profesor.findByPk(query.email)
        console.log(profesor)
        

            // const newDate = nuevosHorarios(profesor.calendario.find(date => date.fecha.dia===query.fecha.dia), null, query)
            const thisDate = profesor.calendario.find(date => date.fecha.dia===query.fecha.dia)
            const newDate = nuevosHorarios(thisDate, null, query)
            return res.send(newDate)
            // const nuevoCalendarioMap = profesor.calendario.map(date => date.fecha.dia===query.fecha.dia ? newDate : date)
            // console.log(nuevoCalendarioMap)
            // const profUpdate = await profesor.update({calendario: nuevoCalendarioMap})
            // return res.send(profUpdate)
        
    
})

router.put('/edit', validateToken, async (req: MiddlewareRequest, res: Response) => {
    let query: Ocupado = req.body

    if (req.data.role !== 2 && req.body.email != req.data.mail) {
             return res.status(400).send('You are not authorized.')
    }

    try {
        let profesor = await Profesor.findOne({
            where: {
                User_mail: query.email
            }
        })

        if (profesor) {
            if (profesor.calendario) {

                let indice = profesor.calendario.findIndex(element => element.fecha.anio === query.fecha.anio && element.fecha.mes === query.fecha.mes && element.fecha.dia === query.fecha.dia)

                let calendario = profesor.calendario[indice]

                if (calendario) {
                    
                    if (query.ocupado) {
                        const calendarioEditado: Horario = nuevosHorarios(calendario, null, query)

                        const nuevoCalendario = profesor.calendario.map((fecha, i) => i === indice ? calendarioEditado : fecha)

                        profesor.set({
                            ...profesor,
                            calendario: nuevoCalendario
                        })
                        let resultado = await profesor.save()
                        res.send(resultado)
                    }
                }
            }
        }
    }

    catch (error) {
        res.send(error)
    }
});

router.put('/delete', validateToken, async (req:MiddlewareRequest, res:Response) => {
    if (req.data.role !== 2 && req.body.email != req.data.mail) {
        return res.status(400).send('You are not authorized.')
    }

    if (!req.body.email) return res.status(400).send('You have to send a valid email')

    try {
        const professor = await Profesor.findByPk(req.body.email)
        const calendar = professor.calendario
        const thisDate = calendar.find(c => c.fecha.anio === req.body.fecha.anio && c.fecha.mes === req.body.fecha.mes && c.fecha.dia === req.body.fecha.dia)
        let newDate: Horario = {email: professor.User_mail, fecha: thisDate.fecha, disponible: thisDate.disponible, ocupado: thisDate.ocupado}

        if (req.body.disponible) {
            let newAvaliable = thisDate.disponible.filter(tuple => {console.log(tuple[0] === req.body.disponible[0][0], tuple[1] === req.body.disponible[0][1]);return !(tuple[0] === req.body.disponible[0][0] && tuple[1] === req.body.disponible[0][1])})
            if (newAvaliable.length === 0) newAvaliable = null
            newDate.disponible = newAvaliable
            const calendarWithoutOldDate = calendar.filter(c => c !== thisDate)
            const newCalendar = newDate.disponible!==null || newDate.ocupado!==null ? [...calendarWithoutOldDate, newDate] : calendarWithoutOldDate
            professor.set({
                ...professor, 
                calendario: newCalendar
            })
            const result = await professor.save()
            return res.send(result)
        } else if (req.body.ocupado) {
            let newAvaliable = thisDate.ocupado.filter(tuple => {return !(tuple[0] === req.body.ocupado[0][0] && tuple[1] === req.body.ocupado[0][1])})
            if (newAvaliable.length === 0) newAvaliable = null
            newDate.ocupado = newAvaliable
            const calendarWithoutOldDate = calendar.filter(c => c !== thisDate)
            const newCalendar = newDate.disponible!==null || newDate.ocupado!==null ? [...calendarWithoutOldDate, newDate] : calendarWithoutOldDate
            professor.set({
                ...professor, 
                calendario: newCalendar
            })
            const result = await professor.save()
            return res.send(result)
        }
    } catch (err) {
        return res.status(400).send(err)
    }
})

router.post('/calendarAdd', async (req:Request, res:Response) => {
    const publication = req.body
    const calendarPayload = publication.agenda
    const User_mail = req.body.User_mail
    const monthlyCalendar = weeklyToMonthlyCalendar(calendarPayload.week, calendarPayload.forHowLong, calendarPayload.sundayStartsOn, User_mail)
    try {

        for (const available of monthlyCalendar) {
            await setNewCalendar(available)
        }
        return res.send('success')
    } catch(err) {
        return res.status(400).send('fail')
    }
})

export default router
