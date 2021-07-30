import axios from 'axios'
import Profesor from '../../models/Profesor'
import {sequelize} from '../../db'
import {CalendarioResponse, Disponible, Horario, Ocupado, IProfesor} from '../../../interfaces'
import {
    horario1,
    horario2,
    ocupado1,
    ocupado2,
    expectedThirdTest,
    newAvailable,
    newNewAvailable,
    newNewTaken,
    extendedAvailable,
    extendedTaken,
    expectedSixth,
    upperAvailable,
    bottomAvailable,
    middleAvailable,
    expectedSeventh,
    expectedFourthTest,
    expectedFifthTest,
    expectedSixthTest,
    expectedSeventhTest,
    eighthTest,
    ninthTest
} from './testsInjection'


sequelize.addModels([Profesor])


afterAll(() => {
    // Closing the DB connection allows Jest to exit successfully.
    sequelize.close();

    
  });

describe ('guarda y modifica el calendario del profesor correctamente', () => {


    let tokenEdward;
    let tokenDiego;
    
    it('postea varios horarios correctamente', async () => {
    
        const login = await axios.post('http://localhost:3001/api/login', {mail: 'edwardburgos@gmail.com', password: '123456'})
        tokenEdward = login.data.token
        await axios.post('http://localhost:3001/api/calendario/add', horario1, {headers: {Authorization: tokenEdward}})
        await axios.post('http://localhost:3001/api/calendario/add', horario2, {headers: {Authorization: tokenEdward}})
        const Edward = await Profesor.findByPk('edwardburgos@gmail.com')
    
        return expect(Edward?.calendario).toEqual([{...horario1, disponible: horario1.disponible.concat(horario2.disponible), ocupado: null}])
        
    })

    it ('deberia pisar horarios disponibles con horarios ocupados', async () => {
        
        await axios.put('http://localhost:3001/api/calendario/edit', ocupado1, {headers: {Authorization: tokenEdward}})
        const Edward = await Profesor.findByPk('edwardburgos@gmail.com')

        console.log(Edward?.calendario)
        return expect(Edward?.calendario).toEqual([{...horario1, disponible: horario2.disponible, ocupado: ocupado1.ocupado}])
        

    })

    it ('deberia pisar rangos de horarios: si tiene de disponible [\'18:00:00\', \'20:00:00\'] y le pasan de ocupado [\'19:00:00\', \'20:00:00\'], deberia quedar en disponible [\'18:00:00\', \'19:00:00\']', async () => {
        await axios.put('http://localhost:3001/api/calendario/edit', ocupado2, {headers: {Authorization: tokenEdward}})
        const Edward = await Profesor.findByPk('edwardburgos@gmail.com')

        console.log(Edward?.calendario)
        return expect(Edward?.calendario).toEqual(expectedThirdTest)  
        
    })

    it ('debería agregar un objeto Disponible nuevo al array si se le pasa una nueva fecha', async () => {
        await axios.post('http://localhost:3001/api/calendario/add', newAvailable, {headers: {Authorization: tokenEdward}})
        const Edward = await Profesor.findByPk('edwardburgos@gmail.com')

        return expect (Edward.calendario).toEqual(expectedFourthTest)
    })

    it ('paso 1) agregas un horario disponible. paso 2) ocupas ese horario. paso 3) lo volves a poner como disponible. Deberia quedar solo el disponible y no los dos', async () => {
        await axios.post('http://localhost:3001/api/calendario/add', newNewAvailable, {headers: {Authorization: tokenEdward}})
        await axios.put('http://localhost:3001/api/calendario/edit', newNewTaken, {headers: {Authorization: tokenEdward}})
        await axios.post('http://localhost:3001/api/calendario/add', newNewAvailable, {headers: {Authorization: tokenEdward}})
        const Edward = await Profesor.findByPk('edwardburgos@gmail.com')

        return expect (Edward.calendario).toEqual(expectedFifthTest)

    })

    it ('deberia guardar como disponible a la diferencia entre el ocupado que le pasan y el disponible de antes', async () => {
        await axios.post('http://localhost:3001/api/calendario/add', extendedAvailable, {headers: {Authorization: tokenEdward}})
        await axios.put('http://localhost:3001/api/calendario/edit', extendedTaken, {headers: {Authorization: tokenEdward}})

        const Edward = await Profesor.findByPk('edwardburgos@gmail.com')
        return expect (Edward.calendario).toEqual(expectedSixthTest)
    })

    it ('deberia guardar horarios uniéndolos con los horarios anteriores. 18 a 20 y 20 a 22 deberia unirse en 18 a 22', async () => {
        await axios.post('http://localhost:3001/api/calendario/add', upperAvailable, {headers: {Authorization: tokenEdward}})
        await axios.post('http://localhost:3001/api/calendario/add', bottomAvailable, {headers: {Authorization: tokenEdward}})
        await axios.post('http://localhost:3001/api/calendario/add', middleAvailable, {headers: {Authorization: tokenEdward}})

        const Edward = await Profesor.findByPk('edwardburgos@gmail.com')
        return expect (Edward.calendario).toEqual(expectedSeventhTest)
    })

    it ('deberia guardar el especio disponible que quedó alrededor del espacio ocupado', async () => {
        const login = await axios.post('http://localhost:3001/api/login', {mail: 'diegoaraujo@gmail.com', password: '123456'})
        tokenDiego = login.data.token
        await axios.post('http://localhost:3001/api/calendario/add', eighthTest.firstPost, {headers: {Authorization: tokenDiego}})
        await axios.put('http://localhost:3001/api/calendario/edit', eighthTest.firstPut, {headers: {Authorization: tokenDiego}})

        const Diego = await Profesor.findByPk('diegoaraujo@gmail.com')
        return expect (Diego.calendario).toEqual(eighthTest.expected)
    })

    it ('deberia guardar el especio ocupado que quedó alrededor del espacio disponible', async () => {
        await axios.post('http://localhost:3001/api/calendario/add', ninthTest.previousPost, {headers: {Authorization: tokenDiego}})
        await axios.put('http://localhost:3001/api/calendario/edit', ninthTest.firstPut, {headers: {Authorization: tokenDiego}})
        await axios.post('http://localhost:3001/api/calendario/add', ninthTest.firstPost, {headers: {Authorization: tokenDiego}})

        const Diego = await Profesor.findByPk('diegoaraujo@gmail.com')
        return expect (Diego.calendario).toEqual(ninthTest.expected)
    })
    
})

describe('manipula el calendario de disponibilidad correctamente', () => {
    
})

