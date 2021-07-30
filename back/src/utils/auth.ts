import bcrypt from 'bcrypt'

function hashPassword(password: string) {
    try {
        const salt = bcrypt.genSaltSync()
        const hashedPassword = bcrypt.hashSync(password, salt);

        return hashedPassword
    } catch(err){
        return 'error'
    }
}

function decrypt(entryPassword: string, hashedPassword: string) {
    const compare = bcrypt.compareSync(entryPassword, hashedPassword)
    if (compare) {
        return true
    } else {
        return false
    }
}
export {hashPassword, decrypt}