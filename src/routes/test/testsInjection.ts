import { Disponible, Ocupado, Horario, CalendarioResponse, IUser } from "../../../interfaces"
export const horario1:Disponible = {
    disponible: [['12:00:00', '14:00:00']],
    email: 'edwardburgos@gmail.com',
    fecha: {
        anio: 2021,
        mes: 8,
        dia: 12
    }
}
export const horario2: Disponible = {
    disponible: [['18:00:00', '20:00:00']],
    email: 'edwardburgos@gmail.com',
    fecha: {
        anio: 2021,
        mes: 8,
        dia: 12
    }
}
export const ocupado1: Ocupado = {
    ocupado: [['12:00:00', '14:00:00']],
    email: 'edwardburgos@gmail.com',
    fecha: {
        anio: 2021,
        mes: 8,
        dia: 12
    }
}

export const ocupado2: Ocupado = {
    ocupado: [['19:00:00', '20:00:00']],
    email: 'edwardburgos@gmail.com',
    fecha: {
        anio: 2021,
        mes: 8,
        dia: 12
    }
}

export const expectedThirdTest: CalendarioResponse = [{email: 'edwardburgos@gmail.com', fecha: {anio: 2021, mes: 8, dia: 12}, disponible: [['18:00:00', '19:00:00']], ocupado: [['12:00:00', '14:00:00'],['19:00:00', '20:00:00']]}]

export const newAvailable: Disponible = {
    disponible: [['18:00:00', '20:00:00']],
    email: 'edwardburgos@gmail.com',
    fecha: {
        anio: 2021,
        mes: 8,
        dia: 14
    }
}
export const newNewAvailable: Disponible = {
    disponible: [['18:00:00', '20:00:00']],
    email: 'edwardburgos@gmail.com',
    fecha: {
        anio: 2021,
        mes: 8,
        dia: 16
    }
}

export const newNewTaken: Ocupado = {
    ocupado: [['18:00:00', '20:00:00']],
    email: 'edwardburgos@gmail.com',
    fecha: {
        anio: 2021,
        mes: 8,
        dia: 16
    }
}

export const extendedAvailable: Disponible = {
    disponible: [['18:00:00', '22:00:00']],
    email: 'edwardburgos@gmail.com',
    fecha: {
        anio: 2021,
        mes: 8,
        dia: 20
    }
}

export const extendedTaken: Ocupado = {
    ocupado: [['19:00:00', '21:00:00']],
    email: 'edwardburgos@gmail.com',
    fecha: {
        anio: 2021,
        mes: 8,
        dia: 20
    }
}
export const expectedSixth: Horario = {
    ocupado: [['19:00:00', '21:00:00']],
    disponible: [['18:00:00', '19:00:00'], ['21:00:00', '22:00:00']],
    email: 'edwardburgos@gmail.com',
    fecha: {
        anio: 2021,
        mes: 8,
        dia: 20
    }
}

export const upperAvailable: Disponible = {
    disponible: [['16:00:00', '18:00:00']],
    email: 'edwardburgos@gmail.com',
    fecha: {
        anio: 2021,
        mes: 8,
        dia: 22
    }
}
export const bottomAvailable: Disponible = {
    disponible: [['20:00:00', '22:00:00']],
    email: 'edwardburgos@gmail.com',
    fecha: {
        anio: 2021,
        mes: 8,
        dia: 22
    }
}

export const middleAvailable: Disponible = {
    disponible: [['18:00:00', '20:00:00']],
    email: 'edwardburgos@gmail.com',
    fecha: {
        anio: 2021,
        mes: 8,
        dia: 22
    }
}

export const expectedSeventh: Horario = {
    disponible: [['16:00:00', '22:00:00']],
    ocupado: null,
    email: 'edwardburgos@gmail.com',
    fecha: {
        anio: 2021,
        mes: 8,
        dia: 22
    }
}

export const eighthTest: {
    firstPost: Disponible;
    firstPut: Ocupado;
    expected: CalendarioResponse;
} = {
    firstPost: {
        email: 'diegoaraujo@gmail.com',
        disponible: [['12:00:00', '20:00:00']],
        fecha: {
            anio: 2021,
            dia: 8,
            mes: 7
        }
    },
    firstPut: {
        email: 'diegoaraujo@gmail.com',
        ocupado: [['14:00:00', '18:00:00']],
        fecha: {
            anio: 2021,
            dia: 8,
            mes: 7
        }
    },
    expected: [{
        email: 'diegoaraujo@gmail.com',
        ocupado: [['14:00:00', '18:00:00']],
        disponible: [['12:00:00', '14:00:00'], ['18:00:00', '20:00:00']],
        fecha: {
            anio: 2021,
            dia: 8,
            mes: 7
        }
    }]
}

export const ninthTest: {
    previousPost: Disponible;
    firstPut: Ocupado;
    firstPost: Disponible;
    expected: CalendarioResponse;
} = {
    previousPost: {
        email: 'diegoaraujo@gmail.com',
        disponible: [['12:00:00', '20:00:00']],
        fecha: {
            anio: 2021,
            dia: 9,
            mes: 7
        }
    },
    firstPut: {
        email: 'diegoaraujo@gmail.com',
        ocupado: [['12:00:00', '20:00:00']],
        fecha: {
            anio: 2021,
            dia: 9,
            mes: 7
        }
    },
    firstPost: {
        email: 'diegoaraujo@gmail.com',
        disponible: [['14:00:00', '18:00:00']],
        fecha: {
            anio: 2021,
            dia: 9,
            mes: 7
        }
    },
    expected: [...eighthTest.expected, {
        email: 'diegoaraujo@gmail.com',
        disponible: [['14:00:00', '18:00:00']],
        ocupado: [['12:00:00', '14:00:00'], ['18:00:00', '20:00:00']],
        fecha: {
            anio: 2021,
            dia: 9,
            mes: 7
        }
    }]
}
export const tenthTest : {
    firstPost: Disponible;
    firstDelete: Disponible;
    expected: CalendarioResponse;
} = {
    firstPost: {
        email: 'edwardburgos@gmail.com',
        disponible: [['14:00:00', '18:00:00']],
        fecha: {
            anio: 2021,
            dia: 30,
            mes: 7
        }
    },
    firstDelete: {
        email: 'edwardburgos@gmail.com',
        disponible: [['14:00:00', '18:00:00']],
        fecha: {
            anio: 2021,
            dia: 30,
            mes: 7
        }
    },
    expected: [{
        email: 'edwardburgos@gmail.com',
        disponible: null,
        ocupado: null,
        fecha: {
            anio: 2021,
            dia: 30,
            mes: 7
        }
    }]
}

export const expectedFourthTest: CalendarioResponse = [...expectedThirdTest, {...newAvailable, ocupado: null}]
export const expectedFifthTest: CalendarioResponse = [...expectedFourthTest, {...newNewAvailable, ocupado: null}]
export const expectedSixthTest: CalendarioResponse = [...expectedFifthTest, expectedSixth]
export const expectedSeventhTest: CalendarioResponse = [...expectedSixthTest, expectedSeventh]







export const firstUserTest: {
    firstPost: IUser;

} = {
    firstPost: {
        User_mail: 'juanperez@gmail.com',
        city: 'Córdoba',
        country: 'Argentina',
        lastName: 'Pérez',
        name: 'Juan',
        state: 'Córdoba',
        password: '123456'
    }
}