import asyncHandler from 'express-async-handler'
import { userRepository } from "../repositories/userRepository.js";
import CustomError from '../utils/CustomError.js';

export const userServices = {
    register: asyncHandler( async(userData) => {
        const existingUser = await userRepository.findByEmail(userData.email)
        if(existingUser){
            throw new CustomError('Email Already Exist!', 409)
        }
        const user = await userRepository.createUser(userData)
        return user
    }),
    readAll: asyncHandler( async(userData) => {
        const user = await userRepository.readAll()
        if(!user){
            throw new CustomError('No Users found!', 400)
        }
        return user
    }),
}