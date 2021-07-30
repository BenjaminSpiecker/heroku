import app from './src/app'
import {sequelize} from './src/db'
import bootstrap from './src/bootstrap'
import User from './src/models/Usuario'
sequelize
.sync({force:true, logging:false})
.then(() => {

    bootstrap()
    console.log('db connected')
    app.listen(3001, () => {
        
        console.log('app listening on port 3001')
        
    })

})
.catch(err => {
    console.log(err)
})



