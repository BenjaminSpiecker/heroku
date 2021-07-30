import { Request, Response, Router } from 'express'
import Clase from '../models/Clase'
import Profesor from '../models/Profesor'
import Puntuacion from '../models/Puntuacion'
import { Op } from 'sequelize'
const router = Router()
router.post('/', async (req: Request, res: Response) => {
    try {
        const { id, alumno, puntuacion, comentario } = req.body;
        const clase = await Clase.findByPk(id, {
            include: [{model: Profesor}, {model: Puntuacion}]
        })
        console.log(clase)
        if (clase) {
            const profesor = clase.Profesor_mail;
            
            if (clase.puntuaciones.length > 0) {
                const puntuacionAlumnoClase = await Puntuacion.findOne({
                    where: {
                        [Op.and]: {
                            clase: id,
                            usuario: alumno
                        }
                    }
                })
                if (puntuacionAlumnoClase) {
                    return res.send(`${alumno} ya comentó esta clase si desea actualice su puntuacion`)
                }
            }
            const punt = await Puntuacion.create({
                usuario: alumno,
                clase: id,
                puntuacion,
                comentario
            });
            
            const puntuaciones = await Puntuacion.findAll({
                where: { clase: id },
                attributes: ['puntuacion']
            })
            
            let puntuacionClase = parseFloat((puntuaciones.map(elemento => elemento.puntuacion).reduce(function (a, b) { return a + b; }) / puntuaciones.length).toFixed(2))

            const claseActualizada = await clase.update({ puntuacion: puntuacionClase })
            const classs = await clase.save()
            
            let classes = await Clase.findAll({
                where: { Profesor_mail: profesor },
                include: Puntuacion
            })
            
            let puntuacionProfesor = parseFloat((classes.map(elemento => elemento.puntuacion).reduce(function (a, b) { return a + b; }) / classes.length).toFixed(2))

            let howMany = 0
            classes.forEach( c => {
                howMany += c.puntuaciones.length
            })

            let profesorPorActualizar = await Profesor.findByPk(profesor);
            if (profesorPorActualizar) {
                await profesorPorActualizar.update({ score: puntuacionProfesor, howMany })
                await profesorPorActualizar.save()
            }
            return res.send(profesorPorActualizar)
        }
        return res.send(`No se encontró ninguna clase con el id ${id}`)
    } catch (error) {
        return res.send(error);
    }
})

// Actualizar la puntuacion de una clase
router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, alumno, puntuacion, comentario } = req.body;
        const clase = await Clase.findOne({
            where: { id },
            include: [{
                model: Puntuacion,
                attributes: ['puntuacion']
            }]
        })
        if (clase) {
            const profesor = clase.Profesor_mail;
            if (clase.puntuaciones.length) {
                const puntuacionAlumnoClase = await Puntuacion.findOne({
                    where: {
                        [Op.and]: {
                            clase: id,
                            usuario: alumno
                        }
                    }
                })
                if (puntuacionAlumnoClase) {
                    await puntuacionAlumnoClase.update({
                        puntuacion,
                        comentario
                    })
                } else {
                    return res.send(`${alumno} aún no ha comentado esta clase si desea cree una nueva puntuacion`)
                }
            }
            const puntuaciones = await Puntuacion.findAll({
                where: { clase: id },
                attributes: ['puntuacion']
            })

            let puntuacionClase = parseFloat((puntuaciones.map(elemento => elemento.puntuacion).reduce(function (a, b) { return a + b; }) / puntuaciones.length).toFixed(2))
            let claseActualizada = await Clase.findOne({
                where: { id },
                include: [{
                    model: Puntuacion,
                    required: true,
                    attributes: ['usuario', 'puntuacion', 'comentario']
                }]
            })
            if (claseActualizada) {
                claseActualizada = await claseActualizada.update({ puntuacion: puntuacionClase })
            }
            let clasesProfesor = await Clase.findAll({
                where: { Profesor_mail: profesor },
                attributes: ['puntuacion']
            })

            let puntuacionProfesor = parseFloat((clasesProfesor.map(elemento => elemento.puntuacion).reduce(function (a, b) { return a + b; }) / clasesProfesor.length).toFixed(2))

            let profesorPorActualizar = await Profesor.findOne({ where: { User_mail: profesor } });
            if (profesorPorActualizar) {
                await profesorPorActualizar.update({ score: puntuacionProfesor })
                await profesorPorActualizar.save()
            }
            return res.send(claseActualizada)
        }
        return res.send(`No se encontró ninguna clase con el id ${id}`)
    } catch (error) {
        return res.send(error);
    }
})
export default router