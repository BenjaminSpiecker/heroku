import cookieParser from 'cookie-parser';
import express, {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import cors from 'cors'
import config from './lib/config';
import routes from './routes/index'
import session from 'express-session'
import payment from './routes/payment'
const app = express()

// app.use(express.static("public"))
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(session({
    name: 'session-id',
    secret: config.session_secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 
    }
}));

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

interface Error {
    message: string;
    status: number;
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message)
})

app.use('/api', routes)
app.use('/', payment)

export default app;