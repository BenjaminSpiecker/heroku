import { createHmac, scryptSync, createCipheriv} from 'crypto';

function encrypt (data: string): string {
    const key = scryptSync('password', 'salt', 16).toString('hex');
    const iv = Buffer.alloc(16, 0);
    let cipher = createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return encrypted

}

// function decrypt (data: string): string {

// }