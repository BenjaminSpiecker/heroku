import { Sequelize } from "sequelize-typescript";
import config from './lib/config'


const sequelize = new Sequelize (process.env.DATABASE_URL, {
    models: [__dirname+'/models'],
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            required: true,
            rejectUnauthorized: false
        }      
    }
});

export {sequelize};
