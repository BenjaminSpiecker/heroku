let sunday = new Date()

sunday.setDate(sunday.getDate() - sunday.getDay() % 7)

// {clase: IClase, agenda: {week: Week[], sundayStartsOn: IDate, forHowLong: number}}
const [sundayYear, sundayMonth, sundayDay] = [sunday.getFullYear(), sunday.getMonth() + 1, sunday.getDate()]
console.log(sundayDay)
