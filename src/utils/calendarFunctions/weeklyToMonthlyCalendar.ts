
import { Disponible, Week } from "../../../interfaces";

function weeklyToMonthlyCalendar(week: Week[], forHowLong: number, sundayStartsOn: {year: number, month: number, day: number}, email: string): Disponible[]{
    console.log("week", week, "forHowLong", forHowLong, "sundayStartsOn",sundayStartsOn,"email",email )
  
  
  
    const datesOfDays = []
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ]

    for (const i of week) {
        
        const index = days.indexOf(i.day)

        let date = new Date()

        date.setDate(sundayStartsOn.day + index)

        const date_of_day = date.getDate()

        const month_of_day = date.getMonth() + 1

        const year_of_day = date.getFullYear()

        const available: Disponible = {
            disponible: i.disponible,
            email: email,
            fecha: {
                anio: year_of_day,
                dia: date_of_day,
                mes: month_of_day
            }
        }
        datesOfDays.push(available) // {Lunes: {disponible:, email:, }}
    }
    const payload: Disponible[] = datesOfDays

    let howMany:Disponible[] = []

    for (let i = 1; i<forHowLong; i++) {
        
        payload.forEach((available: Disponible) => {

            let date = new Date()

            const date_of_day = available.fecha.dia

            const date_of_next_week = date_of_day + (i) * 7

            date.setDate(date_of_next_week)

            howMany.push(
                {
                    disponible: available.disponible,
                    email: email,
                    fecha: {
                        dia: date.getDate(),
                        mes: date.getMonth() + 1,
                        anio: date.getFullYear()
                    }
                }
            )


        })
    }

    return [...payload, ...howMany]
}

export default weeklyToMonthlyCalendar