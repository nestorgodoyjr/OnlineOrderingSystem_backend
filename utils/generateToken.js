import jwt from 'jsonwebtoken'
import CustomError from './CustomError.js'

export const generateAccessToken = (id) =>{
    const JWT_SECRET = process.env.JWT_SECRET
    if( !JWT_SECRET ) throw new CustomError('JWT_Secret undefined!', 400)
    return jwt.sign({id}, JWT_SECRET, {
        expiresIn: '15m'
    })
}

export const generateRefreshToken = (id) =>{
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
    if( !JWT_REFRESH_SECRET ) throw new CustomError('JWT_Refresh_Secret undefined!', 400)
    return jwt.sign({id}, JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    })
}
