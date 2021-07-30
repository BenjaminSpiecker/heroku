import { Router, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IClase, IUser } from "../../interfaces";
import market from "../MarketFlow";
const router = Router();

router.post('/publish', async (req:Request, res:Response) => {
    if (!req.headers.authorization) return res.status(400).send('you have to put a property \"token\" in the request header Authorization')
    const publish = await market.publishDemand(req.body, req.headers.authorization)
    return res.send(publish)
})

router.post('/buy/:token', async (req:Request, res:Response) => {  
    const {publication, user} = req.body
    const buy = await market.buy(publication, user)
    return buy
})

export default router