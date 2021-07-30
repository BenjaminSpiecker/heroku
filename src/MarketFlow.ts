import { Disponible, IDate, IClase, Ocupado, Time, Week, IUser } from "../interfaces";
import mail from "./utils/actions/mailer";
import Clase from "./models/Clase";
import User from "./models/Usuario";
import weeklyToMonthlyCalendar from "./utils/calendarFunctions/weeklyToMonthlyCalendar";
import setNewCalendar from "./utils/calendarFunctions/setNewCalendar";
import Profesor from "./models/Profesor";
import { sign } from "jsonwebtoken";
class MarketFlow {
    listeners: {id: number, cb: (buyer) => Promise<void>}[];

    suscribe(publication: IClase, publisher: IUser) {
        // const classToken = sign({id: publication.id, publisher: publisher.User_mail}, process.env.SECRET)
        const buyLink = sign({publication, publisher}, process.env.SECRET)
        const mailAlert = function (buyer: IUser): Promise<void> {
            if (publication.User_mail) {
                return mail(publisher.User_mail, `Alguien te quiere dar la clase de ${publication.materia} que publicaste.`, `Hola ${publisher.name}, el profesor/a ${buyer.name} ${buyer.lastName} se propuso para darte la clase que tanto buscas! Para confirmar que tomarás la clase debes ir a confirmarla y pagarla a este link ${buyLink}`)
            } else if (publication.Profesor_mail) {
                const confirmationLink = 'http://...'
                return mail(publisher.User_mail, `Alguien quiere tomar la clase de${publication.materia} que publicaste.`, `Hola ${publisher.name}, un alumno quiere tomar la clase que tú estas dando! Para confirmar que le darás la clase debes ir a confirmarla a este link ${confirmationLink}`)
            }
        }
        this.listeners.push({id: publication.id, cb: mailAlert})
    }

    buy (publication: IClase, buyer: IUser): Promise<string> | string {
        let listener = this.listeners?.find(listener => listener.id === publication.id)
        if (listener) {
            return listener.cb(buyer).then(() => `Se le ha enviado un mail a ${publication.User_mail || publication.Profesor_mail}. Espera a que te conteste!`)
        } else {
             return `no se encontró una clase con el id ${publication.id}`
        }
    }

    pay() {

    }

    async publishDemand (publication: {clase: IClase, agenda: {week: Week[], sundayStartsOn: IDate, forHowLong: number}}, token: string): Promise<any> {  
        
        const calendarPayload = publication.agenda
        const [publisher, publisherRole] = publication.clase.Profesor_mail ? [await User.findByPk(publication.clase.Profesor_mail), 'profesor'] : [await User.findByPk(publication.clase.User_mail), 'alumno']

        return Clase.create({...publication.clase, materia: publication.clase.materia.normalize("NFD").replace(/\p{Diacritic}/gu, ""), ciudad: publisher.city})
        
        // .then(() => this.suscribe(publication.clase, publisher))
        .then((r) => {mail(publisher.User_mail, `Felicitaciones ${publisher.name}! Tu clase de ${publication.clase.materia} ya está publicada`,
        `Gracias por confiar en E Clases Online. Su clase online está muy cerca. Ahora tienes que esperar a que un ${publisherRole} quiera tomar tu clase`)})
        .catch(err => console.log(err))
    }
}
const market = new MarketFlow()

export default market