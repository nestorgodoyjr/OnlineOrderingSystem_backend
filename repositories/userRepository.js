import User from "../models/User.js";
import CustomError from "../utils/CustomError.js";

export const userRepository = {
    createUser : async (userData) => {
        const newUser = new User(userData)
        return await newUser.save()
    },
    read : async () => {
        
    },
    findByEmail : async (email) => {
        return await User.findOne({email}).select('+password')
    },
    update : async () => {
        
    },
    delete : async (userData) => {
       
        
    }
}