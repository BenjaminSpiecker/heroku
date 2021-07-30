import { Time } from "../../interfaces";

const parseToStringTuples = (tuple: [number, number]): Time => {
    let firstPoint = tuple[0].toString()
    let secondPoint = tuple[1].toString()

    let [int1, decimal1] = firstPoint.split('.')
    let [int2, decimal2] = secondPoint.split('.')

    int1 = int1.length < 2 ? '0' + int1 : int1
    int2 = int2.length < 2 ? '0' + int2 : int2

    if (!decimal1) decimal1 = '00'
    if (!decimal2) decimal2 = '00'

    if (decimal1.length === 1) decimal1 = decimal1 + '0'
    if (decimal2.length === 1) decimal2 = decimal2 + '0'

    

    return [`${parseInt(int1[0])}${parseInt(int1[1])}:${parseInt(decimal1[0])}${parseInt(decimal1[1])}:00`, `${parseInt(int2[0])}${parseInt(int2[1])}:${parseInt(decimal2[0])}${parseInt(decimal2[1])}:00`]
}

const parseToIntTuples = (tuple: Time): [number, number] => {
    const integers1 = tuple[0].split(':')
    const integers2 = tuple[1].split(':')
	
    const int1 = integers1[0][0]
    const int2 = integers1[0][1]

    const intA = integers2[0][0]
    const intB = integers2[0][1]
    
    const decimal1 = integers1[1][0]
    const decimal2 = integers1[1][1]
    
    const decimalA = integers2[1][0]
    const decimalB = integers2[1][1]

    return [parseInt(int1)*10+parseInt(int2)+parseInt(decimal1)/10 + parseInt(decimal2)/100, parseInt(intA)*10+parseInt(intB)+parseInt(decimalA)/10 + parseInt(decimalB)/100]

}

export {parseToStringTuples, parseToIntTuples}