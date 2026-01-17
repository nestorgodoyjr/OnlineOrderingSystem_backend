import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import {authRepository} from '../repositories/authRepository.js';
import CustomError from '../utils/CustomError.js'
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js'
import bcrypt from 'bcryptjs';
import { refreshTokenRepository } from '../repositories/refreshTokenRepository.js';

export const authServices = {
    register: asyncHandler( async(userData) => {
        const existingUser = await authRepository.findByEmail(userData.email)
        if(existingUser){
            throw new CustomError('Email Already Exist!', 409)
        }
        const user = await authRepository.createUser(userData)
        return user
    }),
    login: asyncHandler( async({email, password}) => {
        const user = await authRepository.findByEmail(email)
        if(!user) throw new CustomError("Invalid Credentials", 401)
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) throw new CustomError('Invalid Credentials', 401)

        const accessToken = generateAccessToken(user.id)
        const refreshToken = generateRefreshToken(user.id)

        await refreshTokenRepository.create({
            user: user.id,
            token: refreshToken
        })

        user.password = undefined
        return {
            user,
            accessToken,
            refreshToken
        }
    }),
    refresh: asyncHandler( async(token) => {
        let decoded

        try {
            decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (error) {
            throw new CustomError('Invalid or expired refresh token', 401)
        }

        const storedToken = await refreshTokenRepository.findByToken(token)
        if(!storedToken) throw new CustomError('Refresh token revoked', 401)
        
        await refreshTokenRepository.deleteByToken(token)

        const newAccessToken = generateAccessToken(decoded.id)
        const newRefreshToken = generateRefreshToken(decoded.id)

        await refreshTokenRepository.create({
            user: decoded.id,
            token: newRefreshToken
        })

        return {
            accessToken : newAccessToken,
            refreshToken: newRefreshToken
        }
    }),
    logout: asyncHandler( async(userId) => {
        await refreshTokenRepository.deleteByUser(userId)
    })
}