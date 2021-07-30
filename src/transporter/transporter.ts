import nodemailer from 'nodemailer'
import config from '../lib/config'
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.gmail_user,
        pass: config.gmail_password
    }
})
export default transporter