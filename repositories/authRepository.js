import User from "../models/User.js";

export const authRepository = {
    createUser : async (userData) => {
        const newUser = new User(userData)
        return await newUser.save()
    },
    readById : async (id) => {
        return User.findById(id)
    },
    findByEmail : async (email) => {
        return await User.findOne({email}).select('+password')
    }
}
