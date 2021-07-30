 

export function isUser (arg: any){
    if (typeof arg !== 'object') return false
    const keys = ['name', 'lastName', 'User_mail', 'country', 'state', 'city']
    let areOfType: boolean;
    for (const key of keys) {
        console.log(key)
        if (typeof arg[key] !== 'string') areOfType = false
    }
    if (areOfType === false) return false
    return true
}
