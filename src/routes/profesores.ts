import { Request, Response, Router } from 'express'
import Profesor from '../models/Profesor';
import User from '../models/Usuario';
import { Op } from 'sequelize'
import Clase from '../models/Clase';
import { IProfesor, IUser } from '../../interfaces';
import Puntuacion from '../models/Puntuacion';
import IUserToIProfesor from '../utils/transformations/IUserToIProfesor'
import { isUser } from '../utils/isInterface';
import validateEmail from '../utils/validateEmail';
const router = Router();

router.get('/', async (req: Request, res: Response) => { // profesore?name=rod
    let terminoBusqueda = req.query.nombre;
    if (!terminoBusqueda) terminoBusqueda = ''
    let users = [];
    if (terminoBusqueda) { // Siendo más extrictos sería > if (terminoBusqueda && typeof terminoBusqueda === 'string')
        terminoBusqueda = terminoBusqueda.toString()
        users = await User.findAll({
            include: [{
                model: Profesor,
                required: true
            }],
            where: {
                [Op.or]: [
                    {
                        name:
                            { [Op.iLike]: `%${terminoBusqueda}%` }
                    },
                    {
                        lastName:
                            { [Op.iLike]: `%${terminoBusqueda}%` }
                    },
                    {
                        User_mail:
                            { [Op.iLike]: `%${terminoBusqueda}%` }
                    }
                ]
            }
            
        })
        if (users.length) return res.send(users.map(IUserToIProfesor));

        return res.send(`No se encontraron coincidencias con ${terminoBusqueda.toString()}`)
    }
    users = await User.findAll({
        include: [{
            model: Profesor,
            required: true
        }]
    })
    if (users.length) return res.send(users.map(IUserToIProfesor));
    return res.send(`No se encontraron coincidencias con ${terminoBusqueda.toString()}`)
})

router.get('/:mail', async (req: Request, res: Response) => {
    const mail = req.params.mail;
    if (!validateEmail(mail)) return res.status(400).send('not a valid email')
    const user: User | null = await User.findOne({
        include: [{
            model: Profesor
        }, {
            model: Puntuacion
        }],
        where: {
            User_mail: mail.toString()
        },
    });
    if (!user) return res.status(400).send(`no user with email ${mail}`)

    if (user.profesor) return res.send(IUserToIProfesor(user))

    return res.send(`No existe ningún profesor asociado la cuenta del correo ${mail}`)
    
})

router.get('/:mail/clases', async (req: Request, res: Response) => {
    const mail = req.params.mail;
    const usuario = await User.findOne({
        include: [{
            model: Profesor
        }],
        where: {
            User_mail: mail.toString()
        },
    });
    if (usuario) {
        if (usuario.profesor) {
            const clases = await Clase.findAll({
              where: {
                Profesor_mail: mail.toString()
            }
            });
            if (clases.length) {
                res.send(clases)
            } else {
                res.send(`El profesor ${usuario.name} ${usuario.lastName} aún no tiene clases registradas`)
            }
        } else {
            return res.send(`No existe ningún profesor asociado la cuenta del correo ${mail}`)
        }
    } else {
        return res.send(`No existe ninguna cuenta con el correo ${mail}`)
    }
})

router.post('/', async (req: Request, res: Response) => {
    if (!isUser(req.body)) return res.status(400).send('request body does not respect interface IUser')
    
    const usuario = await User.findOne({
        include: [{
            model: Profesor
        }],
        where: {
            User_mail: req.body.User_mail
        },
    });

    if (usuario) {
        if (!usuario.profesor) {
            const profesor = await Profesor.create(req.body)
            return res.send(profesor)
        } else {
            return res.send(`Ya existe un profesor asociado a la cuenta ${req.body.User_mail} así que debería actualizarlo`);
        }
    } else {
        return res.send(`No existe una cuenta con el correo ${req.body.User_mail}`)
    }
    
})

router.patch('/', async (req: Request, res: Response) => {
    const { ciudad, foto, description,title } = req.body;
    const mail = req.body.usuario;
    
    if (mail) {
        let usuario = await User.findOne({
            include: [{
                model: Profesor,
            }],
            where: {
                User_mail: mail.toString()
            },
            
        });
        if (usuario) {
            usuario.set({...req.body})
            await usuario.save()
            if (usuario.profesor) {
                await usuario.profesor.update({...req.body},{
                    where:{
                        User_mail:mail
                    }
                })
            } else {
                return res.send(`No existe un profesor asociado a la cuenta ${mail} así que primero debe crearlo`)
            }
        } else {
            return res.send(`No existe una cuenta con el correo ${mail}`)
        }
        
        return res.send(IUserToIProfesor(usuario));
    }
    return res.send('Indique un correo');
})

router.delete('/:mail', async (req: Request, res: Response) => {
    const mail = req.params.mail;
    const usuario = await User.findOne({
        include: [{
            model: Profesor
        }],
        where: {
            User_mail: mail.toString()
        }
    });
    if (usuario) {
        if (usuario.profesor) {
            await Profesor.destroy({
                where: {
                    User_mail: mail.toString()
                }
            });
            return res.send(`El profesor asociado a la cuenta ${mail} fue eliminado exitosamente`)
        } else {
            return res.send(`No existe ningún profesor asociado la cuenta del correo ${mail}`)
        }
    } else {
        return res.send(`No existe ninguna cuenta con el correo ${mail}`)
    }
});

export default router;