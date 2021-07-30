import express from 'express'
import {Request, Response} from 'express'
import sequelize from './db'
import Profesor from './models/Profesor'
import path from 'path'
import cors from 'cors'
import config from './config'
const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  }); 


app.use(
    cors(  {
        origin: config.cors,
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE','PATCH'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'authorization']
    }  )
)

app.use (express.static(`build`))

app.get('/profesores', async (req:Request, res:Response) => {
    try {
        const profesor = await Profesor.findAll()
        // console.log(profesor)
        return res.send(profesor)
    } catch (err) {
        return res.status(400).send(err)
    }
})

app.get('/*', (req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname, `build`, `index.html`))
})

sequelize.sync().then(e => {
    
    Profesor.create({name: 'braian', lastName: 'silva'}).then(() => {})

    app.listen(process.env.PORT || 3000, () => {
        console.log('its working')
    })
    
}
    )
//