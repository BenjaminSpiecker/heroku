import app from './src/app'
import {sequelize} from './src/db'
import bootstrap from './src/bootstrap'
import User from './src/models/Usuario'
import config from './src/lib/config'
sequelize
.sync({force:true, logging:false})
.then(() => {

    bootstrap()
    console.log('db connected')
    app.listen(config.port, () => {
        
        console.log(`app listening on port ${config.port}`);
        
    })

})
.catch(err => {
    console.log(err)
})



