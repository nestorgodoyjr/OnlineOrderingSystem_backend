import asyncHandler from 'express-async-handler'
import { userServices } from '../services/userServices.js'
const userController = {
    register : asyncHandler( async( req, res) => {
        const user = await userServices.register(req.body)
            res.status(200).json({
                success: true,
                data: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            })
    }),
    readAll : asyncHandler( async( req, res) => {
        const user = await userServices.readAll()
            res.status(200).json({
                success: true,
                data: user
            })
    }),
    readById : asyncHandler( async( req, res) => {
        const user = await userServices.readById(req.params.id)
            res.status(200).json({
                success: true,
                data: user
            })
    }),
    updateById : asyncHandler( async( req, res) => {
        const user = await userServices.updateById(req.params.id, req.body)
            res.status(200).json({
                success: true,
                data: user
            })
    }),
    delete : asyncHandler( async( req, res) => {
        const user = await userServices.deleteById(req.params.id)
            res.status(200).json({
                success: true,
                message: 'Deleted User:',
                data: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            })
    }),
}


export default userController