import {JwtPayload, sign, SignOptions, verify} from 'jsonwebtoken'
import { IUser } from './constants'

export const createAccessToken = (user: IUser) => {
    const secretKey: string = process.env.JWT_SECRET_KEY!
    const token = sign(user, secretKey, { expiresIn: '15m' })
    return token
}

export const createRefreshToken = (user: IUser) => {
    const secretKey: string = process.env.JWT_REFRESH_SECRET_KEY!
    const token = sign(user, secretKey, { expiresIn: '15d' })
    return token
}

export const validateToken = (token: string): string | JwtPayload | null => {
    try {
        const secretKey: string = process.env.JWT_SECRET_KEY!
        const isValid = verify(token, secretKey)
        return isValid
    } catch (err) {
        console.log('error in validating token', err)
        return null
    }
}

export const validateRefreshToken = (token: string): string | JwtPayload | null => {
    try {
        const secretKey: string = process.env.JWT_REFRESH_SECRET_KEY!
        const isValid = verify(token, secretKey)
        return isValid
    } catch (err) {
        console.log('error in validating token', err)
        return null
    }
}