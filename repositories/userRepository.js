import User from "../models/User.js";

export const userRepository = {
    createUser : async (userData) => {
        const newUser = new User(userData)
        return await newUser.save()
    },
    readAll : async () => {
        return await User.find()
    },
    readById : async (id) => {
        return User.findById(id)
    },
    findByEmail : async (email) => {
        return await User.findOne({email}).select('+password')
    },
    updateById : async (id, updateData) => {
        const user = await User.findById(id)
        Object.assign(user, updateData)
        return await user.save()
    },
    delete : async (id) => {
       return User.findByIdAndDelete(id)
    }
}