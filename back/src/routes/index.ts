import {Router} from 'express'
import login from './login'
import verify from './verify'
import usuarios from './usuarios'
import clases from './clases'
import profesores from './profesores'
import reclamos from './reclamos'
import calendario from './calendario'
import allCountries from './allCountries'
import market from './market'
import carrito from './carrito'
import puntuacion from './puntuacion'
import calendarFunctions from './calendarFunctions'
const router = Router()

router.use('/verify', verify)
router.use('/login', login)
router.use('/usuarios', usuarios)
router.use('/clases', clases)
router.use('/profesores', profesores)
router.use('/reclamos', reclamos)
router.use('/calendario', calendario)

router.use('/allCountries', allCountries)
router.use('/market', market)
router.use('/carrito', carrito)
router.use('/puntuacion', puntuacion)
router.use('calendarFunctions', calendarFunctions)

export default router