import Router, { Request, Response } from 'express'
import { ClasePorComprar, IClase } from '../../interfaces';
import User from '../models/Usuario';

const router = Router()

router.post('/:user', async function (req: Request, res: Response) {
    const { user } = req.params
    const clase: IClase = req.body
    console.log(clase)
    try {
        const usuario = await User.findByPk(user)
        if (usuario.carrito) {
            const existe = usuario.carrito.some(e => e.id === clase.id)
            if (!existe) {
                usuario.set({
                    ...usuario,
                    carrito: usuario.carrito[0] ? [...usuario.carrito, clase] : [clase],
                    historial: usuario.carrito[0] ? [...usuario.carrito, clase] : [clase]
                })
                const result = await usuario.save()
                res.send(result)
            }
            else {
                res.send("Esa clase ya esta en tu lista")
            }
        } else {
            usuario.set({
                ...usuario,
                carrito: [clase],
                historial:[clase]
            })
            const result = await usuario.save()
            res.send(result)
        }
    }
    catch (error) {
        console.log(error)
    }
})


router.get('/all/:user', async function (req: Request, res: Response) {
    const { user } = req.params
    try {
        const usuario = await User.findByPk(user)
        if (usuario) {
            res.send(usuario.carrito)
        }
        else {
            res.send("Su lista de clases esta vacia")
        }
    }
    catch (error) {
        console.log(error)
    }
})


router.get('/:user/:id', async function (req: Request, res: Response) {
    const { user, id } = req.params
    try {
        const usuario = await User.findByPk(user)

        const clases: IClase[] = usuario.carrito.filter(e => e.id.toString() !== id)
        usuario.set({
            ...usuario,
            carrito: clases
        })
        const result = await usuario.save()
        res.send(result.carrito)
    }
    catch (error) {
        console.log(error)
    }
})



export default router 