import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import CustomError from '../utils/CustomError.js'
import User from '../models/User.js'

const protect = asyncHandler(async(req,res,next) => {
    const JWT_SECRET = process.env.JWT_SECRET
    if( !JWT_SECRET ) {
        throw new CustomError('JWT_Secret undefined!')
    }
    let token
    const authHeaders = req.headers.authorization

    if( authHeaders && authHeaders.startsWith('Bearer ')){
        token = authHeaders.split(' ')[1]
    }
    
    if( !token ){
        throw new CustomError('Unauthorized, no token', 401)
    }
    try{
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
    }catch(error){
        throw new CustomError('Token expired, or invalid', 401)
    }
})

export default protect