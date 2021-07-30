import { Sequelize} from "sequelize-typescript";
import { DataType } from "sequelize-typescript";

const sequelize = new Sequelize('postgres://aatutjfkjazfxv:eb4bd58452e2f952819a3ee43cba037a85a6ab610a3f50cda3f68130f0bcfa15@ec2-35-174-122-153.compute-1.amazonaws.com:5432/d6pkbkb6pi7euh', {
    models: [__dirname+'/models'],
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            required: true,
            rejectUnauthorized: false
        }      
    }
})

sequelize.define('User', {
    name: {
        type: DataType.STRING,
    }
})

export default sequelize