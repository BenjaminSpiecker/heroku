import axios from 'axios'
import {Request, Response, Router} from 'express'

const router = Router()

router.get('/countries', async (req:Request, res:Response) => {
    try {

        const countries = await get_countries()
        return res.send(countries)
    } catch(err) {
        return res.status(400).send(err)
    }
}) // [{name: 'Bangladesh', flag: '}]

router.post('/states', async (req:Request, res:Response) => {
    // const data = await get_countries()
    const {country} = req.body
    if (!country) return res.status(400).send('no country found')
    try {
        const states = await get_states({country: country})
        return res.send(states)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/cities', async (req:Request, res: Response) => {
    const {country, state} = req.body
    if (!(country && state)) return res.status(400).send('both country and state are required')

    try {
        const cities = await get_cities({country: country, state: state})
        return res.send(cities)
    } catch (err) {
        return res.status(400).send(err)
    }
})

async function get_countries() {
    const url = "https://countriesnow.space/api/v0.1/countries/flag/unicode"
    const response = await axios.get(url)
    const data = response.data
    return data
}
// returns [{"name": "Bangladesh", "unicodeFlag": "🇧🇩"}, ...]

async function get_states(json: {country: string}){

    console.log(json)

    const url = 'https://countriesnow.space/api/v0.1/countries/states'
    const response = await axios.post(url, json)
    const data = response.data.data.states
    return data
}
// returns [{"name": "Abia State", "state_code": "AB"}, ...]

async function get_cities(json: {country: string, state: string}){
    const url = 'https://countriesnow.space/api/v0.1/countries/state/cities'
    const response = await axios.post(url, json)
    const data = response.data.data
    return data
}
// returns ["Ancasti", "Andalgalá", ... ]

export default router