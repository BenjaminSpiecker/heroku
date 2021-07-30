import {JwtPayload, verify} from 'jsonwebtoken'
import {Router, Request, Response} from 'express'
import config from '../lib/config'
import validateToken from '../utils/validateToken'
const router = Router()

router.post('/', validateToken, (req: any , res: Response) => {
    return res.send(req.data)
})

export default router