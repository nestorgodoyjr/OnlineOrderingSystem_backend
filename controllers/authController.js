import asyncHandler from 'express-async-handler'
import { authServices } from '../services/authServices.js'

const authController = {
    register: asyncHandler( async(req,res) => {
        const user = await authServices.register(req.body)
            res.status(200).json({
                success: true,
                data: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            })
    }),
    login: asyncHandler( async(req,res) => {
        const {email, password} = req.body 
        const user = await authServices.login({email,password})
        res.status(200).json({
            success: true,
            data: user
        })
    })
}

export default authController