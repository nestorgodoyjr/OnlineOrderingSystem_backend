import express from 'express'
import userController from "../controllers/userControllers.js";

const router = express.Router()

router
    .route('/user')
    .post(userController.register)

export default router
