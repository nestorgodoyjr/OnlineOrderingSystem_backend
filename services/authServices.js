import asyncHandler from 'express-async-handler'
import {authRepository} from '../repositories/authRepository.js';
import CustomError from '../utils/CustomError.js'
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js'
import bcrypt from 'bcryptjs';

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
        if(!user){
            throw new CustomError("Invalid Credentials", 401)
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw new CustomError('Invalid Credentials', 401)
        }

        const genAccessToken = generateAccessToken(user.id)
        const genRefreshToken = generateRefreshToken(user.id)

        user.password = undefined
        return {
            user,
            genAccessToken,
            genRefreshToken
        }
    }),
}