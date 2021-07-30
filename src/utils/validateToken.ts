import {JwtPayload, verify} from 'jsonwebtoken'
import config from '../lib/config'
import {Request, Response} from 'express'

interface MiddlewareRequest extends Request {
data: JwtPayload | undefined;
}
function validateToken(req: MiddlewareRequest, res: Response, next: () => void){
    const token = req.headers['authorization']
    if (!token) return res.status(400).send('incorrect token')
    verify(token, config.secret, (err, data) => {
        if (err) return res.status(400).send('incorrect token')
        console.log(data)
        req.data = data
        next()
    })
}

export default validateToken