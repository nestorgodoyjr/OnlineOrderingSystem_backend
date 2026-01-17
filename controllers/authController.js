import asyncHandler from 'express-async-handler'
import CustomError from '../utils/CustomError.js'
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
    }),
    refresh: asyncHandler(async (req, res) => {
        const { refreshToken } = req.body
        if (!refreshToken) {
        throw new CustomError('No refresh token provided', 401)
        }

        const tokens = await authServices.refresh(refreshToken)

        res.status(200).json({
        success: true,
        data: tokens
        })
    }),
    logout: asyncHandler(async (req, res) => {
        await authServices.logout(req.user.id)

        res.status(200).json({
        success: true,
        message: 'Logged out successfully'
        })
    })
}


export default authController