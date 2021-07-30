import { Request, Response, Router } from 'express'
import Clase from './../models/Clase'
import Profesor from '../models/Profesor'
import Puntuacion from '../models/Puntuacion'
import { Op } from 'sequelize'
import { IUser, Time, IClase } from '../../interfaces'
import User from '../models/Usuario'
import ClaseToIClase from '../utils/transformations/ClaseToIClase'
import BuildClaseToIClase from '../utils/transformations/BuildClaseToIClase'
import filterClassesWithoutAvailables from '../utils/filterClassesWithoutAvailables'
const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const { busqueda } = req.query

    try {
        let clases: any[] = []
        let profesores: any[] = []
        if (busqueda) {
            let palabrasSeparadas = (busqueda as string).split(" ");
            palabrasSeparadas = palabrasSeparadas.filter(x => x !== 'grado')
            palabrasSeparadas = palabrasSeparadas.filter(x => x !== 'año')
            palabrasSeparadas = palabrasSeparadas.filter(x => x !== 'anio')

            for (let x of palabrasSeparadas) {
                try {
                    const c = await Clase.findAll({
                        include: [{ model: Profesor, required: true}, {model: User}],
                        where: {
                            [Op.or]: [{
                                materia: {
                                    [Op.iLike]: `%${x.normalize("NFD").replace(/\p{Diacritic}/gu, "")}%`.replace("\'", '')
                                }
                            },
                            {
                                nivel: {
                                    [Op.iLike]: `%${x}%`.replace("\'", '')
                                }
                            },
                            {
                                grado: {
                                    [Op.iLike]: `%${x}%`.replace("\'", '')
                                }
                            },
                            ]
                        }
                    })
                    clases.push(...c)
                    const p = await User.findAll({
                        include: [{model: Profesor, required: true}],
                        where: {
                            city: {
                                [Op.iLike]: `%${x}%`.replace("\'", '')
                            },
                            
                        }
                    })
                    profesores.push(...p)
                }

                catch (err) {
                    console.log(err)
                }
            }
            if (clases.length){
                const filteredClasses = await filterClassesWithoutAvailables(clases)
                const filteredIClasses = await Promise.all(filteredClasses.map(BuildClaseToIClase))
                return res.send(filteredIClasses)
                // const transformedClases = await Promise.all(classesOnlyAvailables.map(async (cl) => BuildClaseToIClase(cl)))
                // return res.send(transformedClases)
    
            } else if (profesores.length && !clases.length) {
    
                console.log('entre')
                const allProfessorsClasses = await Promise.all(profesores.map( (prof: Profesor) => Clase.findAll({where: {Profesor_mail: prof.User_mail}, include:[{model:Profesor}] } ) ))
                const allFilteredProfessorsClasses = await filterClassesWithoutAvailables(allProfessorsClasses.flat())
                const allIProfessorsClasses = await Promise.all(allFilteredProfessorsClasses.flat().map(BuildClaseToIClase))

                return res.send(allIProfessorsClasses)
            }
        }   else {

                const allClasses = await Clase.findAll({include:[{model:Profesor, required: true}]})
                const filteredClasses = await filterClassesWithoutAvailables(allClasses)
                const filteredIClasses = await Promise.all(filteredClasses.map(BuildClaseToIClase))
                return res.send(filteredIClasses)
                
        }
    } catch (err) {
        res.send(err)
    }
})

router.get('/student', async (req:Request, res:Response)=> {
    const { busqueda } = req.query

    try {
        let clases: Clase[] = []
        let profesores: any[] = []
        if (busqueda) {
            let palabrasSeparadas = (busqueda as string).split(" ");
            palabrasSeparadas = palabrasSeparadas.filter(x => x !== 'grado')
            palabrasSeparadas = palabrasSeparadas.filter(x => x !== 'año')
            palabrasSeparadas = palabrasSeparadas.filter(x => x !== 'anio')

            for (let x of palabrasSeparadas) {
                try {
                    const c = await Clase.findAll({
                        include: [{ model: User, required: true}],
                        where: {
                            [Op.or]: [{
                                materia: {
                                    [Op.iLike]: `%${x.normalize("NFD").replace(/\p{Diacritic}/gu, "")}%`.replace("\'", '')
                                }
                            },
                            {
                                nivel: {
                                    [Op.iLike]: `%${x}%`.replace("\'", '')
                                }
                            },
                            {
                                grado: {
                                    [Op.iLike]: `%${x}%`.replace("\'", '')
                                }
                            },
                            ]
                        }
                    })
                    clases.push(...c)
                    
                }

                catch (err) {
                    console.log(err)
                }
            }
        }
        const transformedClasses = clases.filter(cl => !cl.Profesor_mail).map(cl => ClaseToIClase(cl))
        return res.send(transformedClasses)        
    } catch (err) {
        res.send(err)
    }
})

router.get('/all', async (req:Request, res:Response) => {
    const allClasses = await Clase.findAll({include: [{model: Profesor}, {model: User}]})
    const allClassesWithIClaseInterface = await Promise.all(allClasses.map(async (cl) => await BuildClaseToIClase(cl)))
    return res.send(allClassesWithIClaseInterface)
})


router.get('/all/student/:mail', async (req: Request, res: Response) => {
    const clases = await Clase.findAll({
         include: [{
             model: Profesor,
             required: true
            },{model: User, required: false}],
            
         where: {
            [Op.or]: [
                { User_mail: req.params.mail },
                { Profesor_mail: req.params.mail }
              ]
         }
         })
    const usersOfProfessors = await Promise.all(clases.map(cl => User.findByPk(cl.Profesor_mail)))

    return res.send(clases.map((cl, i) => ClaseToIClase(cl, usersOfProfessors[i])))
})

router.get('/all/profesor/:mail', async (req: Request, res: Response) => {
    const clases = await Clase.findAll({
         include: [{
             model: Profesor,
             required: true
            }],
         
         where: {
            Profesor_mail: req.params.mail
         }
         })
    return res.send(clases)    
})



router.get('/all', async (req: Request, res: Response) => {
    try {
        const clases = await Clase.findAll({ include: [Profesor] })
        res.send(clases)
    }
    catch (error) {
        res.status(404).send("Ops! hubo un error")
    }
})


router.post('/add', async (req: Request, res: Response) => {
    const clase = req.body

    try {
        const crearClase = await Clase.create({
            ...clase,
            materia: req.body.materia.normalize("NFD").replace(/\p{Diacritic}/gu, "")
        })
        res.send(crearClase)
    }
    catch (error) {
        res.status(404).send(new Error('Mail no valido'))
    }
})


router.put('/edit', async (req: Request, res: Response) => {
    const { id, descripcion, materia, nivel, grado, puntuacion, precio } = req.body
    const claseEditada = {
        descripcion,
        materia,
        nivel,
        grado,
        puntuacion,
        precio
    }
    try {
        const clase: any = await Clase.findByPk(id);

        await clase.set(claseEditada);
        const claseCambiada = await clase.save();
        res.send(claseCambiada)
    }
    catch (error) {
        res.send(error)
    }
})

router.post('/status', async (req:Request, res:Response) => {
    const {id, status} = req.body
    try {
        const clase = await Clase.findByPk(id)
        const edit = await clase.update({status})
        return res.send({message: 'success', payload: edit})
    } catch(err) {
        return res.status(400).send('error')
    }
})

router.post('/delete', async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        await Clase.destroy({
            where: { id: id }
        }).then(e => res.send(`${e}`)).catch(err => res.send(err))
    }

    catch (error) {
        res.send(error)
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const clases = await Clase.findOne({ where: {id: id} })
        res.send(clases)
    }
    catch (error) {
        res.status(404).send("Ops! hubo un error")
    }
})

router.get('/student/:mail', async (req: Request, res: Response) => {
    try {
        const mail = req.params.mail
        const clases = await Clase.findAll({where: {
            User_mail: mail
        }, include: [{model: User}, {model: Profesor}]
        })
        const payload = await Promise.all(clases.map(async (cl) => await BuildClaseToIClase(cl)))
        return res.send(payload)
    }
    catch(err) {
        return res.status(400).send(err)
    }
})



export default router

