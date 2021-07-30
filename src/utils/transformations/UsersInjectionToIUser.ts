import { IUser } from "../../../interfaces";
import axios from 'axios'
import {isUser} from '../isInterface'
import validateEmail from '../validateEmail'
async function UsersInjectionToIUser (role, howMany) {
    const response: {data: {results: {email, location: {country, state, city}, name, picture, login:{password}}[]}} = await axios.get(`https://randomuser.me/api/?nat=es&results=${howMany}`)
    
    const users_from_api  = response.data.results
    const IUsers = users_from_api.map(user_from_api => {
        const obj: IUser = {
            User_mail: user_from_api.email,
            city: user_from_api.location.city,
            country: user_from_api.location.country,
            state: user_from_api.location.state,
            name: user_from_api.name.first,
            lastName: user_from_api.name.last,
            foto: user_from_api.picture.medium,
            password: user_from_api.login.password,
            role: role
        }
        console.log(obj)
        if (!isUser(obj)) return false
        return obj
    })
    return IUsers
    // if (!obj.password) return false
    // if (!isUser(obj)) return false
    // if (!validateEmail( obj.User_mail)) return false
}
export default UsersInjectionToIUser