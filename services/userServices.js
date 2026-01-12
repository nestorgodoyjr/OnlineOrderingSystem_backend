import asyncHandler from 'express-async-handler'
import { userRepository } from "../repositories/userRepository.js";
import CustomError from '../utils/CustomError.js';
import mongoose from 'mongoose';

export const userServices = {
    register: asyncHandler( async(userData) => {
        const existingUser = await userRepository.findByEmail(userData.email)
        if(existingUser){
            throw new CustomError('Email Already Exist!', 409)
        }
        const user = await userRepository.createUser(userData)
        return user
    }),
    readAll: asyncHandler( async() => {
        const user = await userRepository.readAll()
        if(!user){
            throw new CustomError('No Users found!', 400)
        }
        return user
    }),
    readById: asyncHandler( async(id) => {
        
        if(!mongoose.isValidObjectId(id)){
            throw new CustomError('Not a valid ID', 400)
        }

        const user = await userRepository.readById(id)

        return user
    }),
    updateById: asyncHandler( async(id, updateData) => {
        
        if(!mongoose.isValidObjectId(id)){
            throw new CustomError('Not a valid ID', 400)
        }

        const user = await userRepository.updateById(id, updateData)

        if(!user){
            throw new CustomError('No User Found!', 400)
        }

        return user
    }),
    deleteById: asyncHandler( async(id) => {
        
        if(!mongoose.isValidObjectId(id)){
            throw new CustomError('Not a valid ID', 400)
        }

        const user = await userRepository.delete(id)

        if(!user){
            throw new CustomError('No User Found', 400)
        }

        return user
    }),
}