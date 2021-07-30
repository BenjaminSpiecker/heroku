import { Router, Request, Response } from "express";
import User from "../models/Usuario";
import {UserProps, Role} from '../../interfaces'
import { hashPassword } from "../utils/auth";
const router = Router()

type Users = UserProps[]

enum ErrorType {INCOMPLETE_INPUTS, ALREADY_EXISTS}

router.post('/register', async (req:Request, res:Response) => {
    const newUser: UserProps = {
        lastName: req.body.lastName,
        mail: req.body.mail,
        name: req.body.name,
        role: req.body.role,
        city: req.body.city,
    }
    if (newUser.lastName && newUser.name && newUser.mail && req.body.password){

        console.log(req.body.password)

        const [user, created] = await User.findOrCreate({
            where: {
                mail: req.body.mail
            },
            defaults: {...newUser, password: hashPassword(req.body.password), suspendido: false}
        })
    
        if (!created) return res.status(400).send({type:ErrorType.ALREADY_EXISTS})
        return res.send(user)
    } else {
        return res.status(400).send({type: ErrorType.INCOMPLETE_INPUTS})
    }
    }
)



router.get('/:user', async (req:Request, res:Response) => {
    
    const user: UserProps | null = await User.findByPk(req.params.user)
    if (user === undefined) {
        return res.send(undefined)
    }
    const rol=user?.role.toString()
    
    return res.send(rol)
})


export default router