import * as crypto from 'crypto'

export default function (secret: string, timestamp: string, payload: any) {
    return crypto.createHmac("sha256", secret).update(timestamp).update(JSON.stringify(payload)).digest("hex")
}

export function validateSignature(s1: string, s2: string) {
    return crypto.timingSafeEqual(
        Buffer.from(s1, 'ascii'),
        Buffer.from(s2, 'ascii')
    )
}