import { Request, Response, Router } from 'express'
import flatInline from '../utils/calendarFunctions/flatInline';
import nuevosHorarios from '../utils/calendarFunctions/nuevosHorarios';
import weeklyToMonthlyCalendar from '../utils/calendarFunctions/weeklyToMonthlyCalendar';
const router = Router();

router.post('/weeklyToMonthlyCalendar', (req: Request, res: Response) => {
    const {week, forHowLong, sundayStartsOn, email} = req.body
    if (!(week && forHowLong && sundayStartsOn && email)) return res.status(400).send('properties are missing in the request body')
    return res.send(weeklyToMonthlyCalendar(week, forHowLong, sundayStartsOn, email))
})

router.post('/flatInline', (req:Request, res:Response) => {
    const {disponible} = req.body
    if (!disponible) return res.status(400).send('\'disponible\' is missing')
    return flatInline(disponible)
})

export default router