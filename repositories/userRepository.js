import User from "../models/User.js";
import CustomError from "../utils/CustomError.js";

export const userRepository = {
    createUser : async (userData) => {
        const newUser = new User(userData)
        return await newUser.save()
    },
    readAll : async () => {
        return await User.find()
    },
    readById : async () => {
        
    },
    findByEmail : async (email) => {
        return await User.findOne({email}).select('+password')
    },
    updateById : async () => {
        
    },
    delete : async (userData) => {
       
        
    }
}