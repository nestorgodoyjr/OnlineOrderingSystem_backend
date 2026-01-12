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
        }
)}


export default userController