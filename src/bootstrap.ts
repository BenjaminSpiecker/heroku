import { Disponible, IProfesor, IUser } from "../interfaces"
import Clase from "./models/Clase"
import axios from "axios"
import Profesor from "./models/Profesor"
import Reclamo from "./models/Reclamo";
import User from "./models/Usuario";
import { Role } from "../interfaces";
import { hashPassword } from "./utils/auth";
import config from './lib/config'

const pass = "123456"

const bootstrap = async () => {
    try {
        //////////////////////
        // Agregar Usuarios //
        //////////////////////

        const d: IUser = {
            name: `Diego`,
            lastName: 'Araujo',
            User_mail: "diegoaraujo@gmail.com",
            role: Role.PROFESSOR,
            
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://firebasestorage.googleapis.com/v0/b/auth-4d665.appspot.com/o/images%2F1627488066448.jpeg?alt=media&token=1392fb14-ede8-4aa9-a1b1-bba3657751ec",
            
        }
        const Diego = {...d, password:pass}
    
        const b: IUser = {
            name: `Braian`,
            lastName: 'Silva',
            User_mail: "braiansilva@gmail.com",
            role: Role.ADMIN,
            
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://avatars.githubusercontent.com/u/80982289?v=4",
            
        }
        const Braian = {...b, password:pass}
    
        const e: IUser = {
            name: 'Edward',
            lastName: 'Burgos',
            User_mail: "edwardburgos@gmail.com",
            role: Role.PROFESSOR,
            
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: 'https://avatars.githubusercontent.com/u/80774061?v=4',
            
        }
        const Edward = {...e, password:pass}
    
        const j: IUser = {
            name: 'Javier',
            lastName: 'Carro',
            User_mail: "javiercarro@gmail.com",
            role: Role.PROFESSOR,
            
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            
        }
        const Javi = {...j, password:pass}
    
        const m: IUser = {
            name: 'Mauro',
            lastName: 'Leonel',
            User_mail: "mauroleonel@gmail.com", 
            role: Role.PROFESSOR,
            
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            
        }
        const MauroLeonel = {...m, password:pass}

        const cc: IUser = {
            name: 'Mauro',
            lastName: 'Loyola',
            User_mail: "mauroloyola@gmail.com", 
            role: Role.PROFESSOR,
            
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://firebasestorage.googleapis.com/v0/b/auth-4d665.appspot.com/o/images%2FMauro-Foto.jpg?alt=media&token=2ed51a34-8d84-4cb2-bbf3-1ed6660d7ff8",
            
        }
        const Mauro = {...cc, password:pass}

        const bb: IUser = {
            name: 'Leonel',
            lastName: 'Llane',
            User_mail: "leonelllane@gmail.com", 
            role: Role.PROFESSOR,
            
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://avatars.githubusercontent.com/u/78386531?v=4",
            
        }
        const Leonel = {...bb, password:pass}


        const ben: IUser = {
            name: 'Benja',
            lastName: 'Spiecker',
            User_mail: "benjaminspiecker@gmail.com", 
            role: Role.PROFESSOR,
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://firebasestorage.googleapis.com/v0/b/auth-4d665.appspot.com/o/images%2FIMG_20190119.jpg?alt=media&token=d616eeab-80d1-4aca-81bb-69958a294fc0",
            
        }
        const Benja = {...ben, password:pass}

        const ped: IUser = {
            name: 'Pedro',
            lastName: 'Pérez',
            User_mail: "pedro@gmail.com", 
            role: Role.USER,
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            
        }
        const Pedro = {...ped, password:pass}

        for (const user of [
            Edward,
            Braian,
            Diego,
            Javi,
            MauroLeonel,
            Benja,
            Pedro,
            Mauro,
            Leonel

        ]) {
            try {
                const u = await User.create({...user, password: hashPassword(user.password)});
                if (u.role === Role.PROFESSOR) {
                    const profesor = await Profesor.create({ User_mail: u.User_mail, ...u,
                    where: {
                        User_mail: u.User_mail
                    } 
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    
        ////////////////////////
        // Agregar Profesores //
        ////////////////////////        

        const DiegoProfe: IProfesor = {
            name: `Diego`,
            lastName: "Araujo",
            User_mail: "diegoaraujo@gmail.com",
            city: "Buenos Aires",
            foto: "https://firebasestorage.googleapis.com/v0/b/auth-4d665.appspot.com/o/images%2F1627488066448.jpeg?alt=media&token=1392fb14-ede8-4aa9-a1b1-bba3657751ec",
            description: "Profesor apasionado por enseñar",
            score: 0,
            country: 'Argentina',
            state: 'Buenos Aires'
        };

        const BraianProfe: IProfesor = {
            name: `Braian`,
            lastName: "Silva",
            User_mail: "braiansilva@gmail.com",
            city: "Buenos Aires",
            foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            description: "Profesor apasionado por enseñar",
            score: 0,
            country: 'Argentina',
            state: 'Buenos Aires'
        };

        const EdwardProfe: IProfesor = {
            name: "Edward",
            lastName: "Burgos",
            User_mail: "edwardburgos@gmail.com",
            city: "Lima",
            foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            description: "Profesor apasionado por enseñar",
            score: 0,
            country: 'Argentina',
            state: 'Buenos Aires'
        };
        const MauroProfe: IProfesor = {
            name: "Mauro",
            lastName: "Leonel",
            User_mail: "mauroleonel@gmail.com",
            city: "Lima",
            foto: "https://firebasestorage.googleapis.com/v0/b/auth-4d665.appspot.com/o/images%2FMauro-Foto.jpg?alt=media&token=2ed51a34-8d84-4cb2-bbf3-1ed6660d7ff8",
            description: "Profesor apasionado por enseñar",
            title: "Ingenierio Industrial",
            score: 0,
            country: 'Argentina',
            state: 'Buenos Aires'
        };
        const JaviProfe: IProfesor = {
            name: "Javier",
            lastName: "Carro",
            User_mail: "javiercarro@gmail.com",
            city: "Lima",
            foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            description: "Profesor apasionado por enseñar",
            score: 0,
            country: 'Argentina',
            state: 'Buenos Aires'
        };
        const BenjaProfe: IProfesor = {
            name: "Benjamín Ismael",
            lastName: "Spiecker",
            User_mail: "benjaminspiecker@gmail.com",
            city: "Buenos Aires",
            foto: "https://firebasestorage.googleapis.com/v0/b/auth-4d665.appspot.com/o/images%2FIMG_20190119.jpg?alt=media&token=d616eeab-80d1-4aca-81bb-69958a294fc0",
            description:
                "Si hablan fuera de turno, hay tabla. Si miran por la ventana, hay tabla. Si miran mis sandalias, hay tabla. Si sacan menos de 9, sea quien sea, hay tabla",
            score: 0,
            country: 'Argentina',
            state: 'Buenos Aires'
        };

        
        
        ////////////////////
        // Agregar Clases //
        ////////////////////

        
        const Clase1 = await Clase.create({
            nombre: "Clase 1 de Ingles",
            Profesor_mail: "edwardburgos@gmail.com",
            descripcion:
                "En esta clase te enseñaré todo lo que necesitas para tener un nivel intermedio de Inglés",
            materia: "Ingles",
            esPresencial: "Presencial",
            grado: "Sexto grado",
            nivel: "Secundario",
            puntuacion: 1,
            date: { year: 2021, month: 8, day: 7, time: ["15:00:00", "19:00:00"] },
            precio: "200",
            
        });
        const Clase2 = await Clase.create({
            nombre: "Clase 2 de Matematica",
            User_mail: "edwardburgos@gmail.com",
            descripcion: "Aprende a sumar y restar para ser el mejor de tu clase",
            materia: "Matematica",
            esPresencial: "Virtual",
            grado: "Primer grado",
            nivel: "Primario",
            puntuacion: 5,
            date: { year: 2021, month: 8, day: 7, time: ["08:00:00", "12:00:00"] },
            precio: "100",
        });

        const Clase3 = await Clase.create({
            nombre: "Clase 3 de Matematica",
            User_mail: "braiansilva@gmail.com",
            descripcion: "Aprende a sumar y restar para ser el mejor de tu clase",
            materia: "Matematica",
            esPresencial: "Virtual",
            grado: "Primer grado",
            nivel: "Primario",
            puntuacion: 5,
            date: { year: 2021, month: 8, day: 7, time: ["08:00:00", "12:00:00"] },
            precio: "100",
        });
        const Clase8 = await Clase.create({
            nombre: "Clase 4 de Matematica",
            Profesor_mail: "mauroleonel@gmail.com",
            User_mail: "braiansilva@gmail.com",
            descripcion: "Aprende a sumar y restar para ser el mejor de tu clase",
            materia: "Matematica",
            esPresencial: "Virtual",
            grado: "Primer grado",
            nivel: "Primario",
            puntuacion: 5,
            date: { year: 2021, month: 8, day: 7, time: ["08:00:00", "12:00:00"] },
            precio: "100",
            status:"cancelled"
        });

        const Clase4 =await Clase.create({
            nombre: 'Clase 5 de Historia',
            Profesor_mail: "edwardburgos@gmail.com",
            User_mail: 'mauroleonel@gmail.com',
            descripcion: 'En esta clase te enseñaré todo lo que necesitas de Historia',
            materia: 'Historia',
            esPresencial: 'Virtual',
            status: 'complete',
            grado: "Sexto grado",
            nivel: 'Secundario',
            puntuacion: 4.20,
            date: { year: 2021, month: 8, day: 7, time: ['12:00:00', '17:00:00'] },
            precio: "200"
        })

        const Clase5 = await Clase.create({
            nombre: 'Clase 6 de Filosofia',
            Profesor_mail: "diegoaraujo@gmail.com",
            User_mail: 'mauroleonel@gmail.com',
            descripcion: 'En esta clase te enseñaré todo lo que necesitas de Filosofia',
            materia: 'Filosofia',
            esPresencial: 'Presencial',
            status: 'pending',
            grado: "Sexto grado",
            nivel: 'Terciario',
            puntuacion: 4,
            date: { year: 2021, month: 8, day: 7, time: ['08:00:00', '10:00:00'] },
            precio: "200",
        })

        const Clase6 = await Clase.create({
            nombre: 'Clase 7 de Ingles',
            Profesor_mail: "edwardburgos@gmail.com",
            descripcion: 'En esta clase te enseñaré todo lo que necesitas para tener un nivel intermedio de Inglés',
            materia: 'Ingles',
            esPresencial: 'Presencial',
            
            grado: "Sexto grado",
            nivel: 'Secundario',
            puntuacion: 1,
            date: { year: 2021, month: 8, day: 7, time: ['15:00:00', '19:00:00'] },
            precio: "200"
        })

        const Clase7 = await Clase.create({
            nombre: 'Clase 8 de Matematica',
            Profesor_mail: "edwardburgos@gmail.com",
            descripcion: 'Aprende a sumar y restar para ser el mejor de tu clase',
            materia: 'Matematica',
            esPresencial: 'Virtual',
            grado: "Primer grado",
            nivel: 'Primario',
            puntuacion: 5,
            date: { year: 2021, month: 8, day: 7, time: ['08:00:00', '12:00:00'] },
            precio: "200"
        })

        const date = new Date()
        
        //////////////////////////
        // Agregar Disponibles //
        /////////////////////////


        for (const user of [
            Edward,
            MauroLeonel,
            Diego,
            Javi,
            Mauro,
            Benja,
            Mauro,
            Leonel
            
        ]) {
            const payload: Disponible = {
                disponible: [['08:00:00', '12:00:00'], ['16:00:00', '21:00:00']],
                email: user.User_mail,
                fecha: {anio: date.getFullYear(), dia: date.getDate(), mes: date.getMonth() + 1}
            }
           
            try {
                
                const token1 = await axios.post(`http://localhost:${config.port}/api/login`, {mail: user.User_mail, password: '123456'})
                await axios.post(`http://localhost:${config.port}/api/calendario/add`, payload, {headers: {Authorization: token1.data.token}})
    
                
            } catch (err) {
                console.log(err)
            }
        }

        // //////////////////////
        // // Agregar Reclamos //
        // //////////////////////
        

        // /* Reclamo 1 */

        const reclamo1 = await Reclamo.create({
            nombre: "Profesor estafador",
            reclamo: "El profesor no se presento a la clase",
        });

        const denunciante = await User.findByPk("benjaminspiecker@gmail.com");
        await denunciante?.$add("denuncias_hechas", [reclamo1]);

        const denunciado = await User.findByPk("edwardburgos@gmail.com");
        await denunciado?.$add("denuncias_recibidas", [reclamo1]);

        const admin = await User.findByPk("braiansilva@gmail.com");
        await admin?.$add("denuncias_administradas", [reclamo1]);

        const clase = await Clase.findByPk(1);
        await clase?.$add("clase", [reclamo1]);
    
        /* Reclamo 2 */
    
        const reclamo2 = await Reclamo.create({
            nombre: "Ayuda",
            reclamo: "Me cobró 500 pesos en la boleta de pago pero despues me pidio que le pague 300 mas",
        });
        const denunciante2 = await User.findByPk("javiercarro@gmail.com");
        await denunciante2?.$add("denuncias_hechas", [reclamo2]);

        const denunciado2 = await User.findByPk("edwardburgos@gmail.com");
        await denunciado2?.$add("denuncias_recibidas", [reclamo2]);

        const admin2 = await User.findByPk("braiansilva@gmail.com");
        await admin2?.$add("denuncias_administradas", [reclamo2]);

        const clase2 = await Clase.findByPk(2);
        await clase2?.$add("clase", [reclamo2]);
    
         /* Reclamo 3 */
    
         const reclamo3 = await Reclamo.create({
            nombre: "Alumno Problemático",
            reclamo: "El profesor no entendia bien el contenido de la materia",
        });
        const denunciante3 = await User.findByPk("diegoaraujo@gmail.com");
        await denunciante3?.$add("denuncias_hechas", [reclamo3]);

        const denunciado3 = await User.findByPk("edwardburgos@gmail.com");
        await denunciado3?.$add("denuncias_recibidas", [reclamo3]);

        const admin3 = await User.findByPk("braiansilva@gmail.com");
        await admin3?.$add("denuncias_administradas", [reclamo3]);

        const clase3 = await Clase.findByPk(3);
        await clase3?.$add("clase", [reclamo3]);
    } catch(err) {
        console.log(err)
    }
}
export default bootstrap
