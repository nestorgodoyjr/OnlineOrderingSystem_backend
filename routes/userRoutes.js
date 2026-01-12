import express from 'express'
import userController from "../controllers/userControllers.js";

const router = express.Router()

router
    .route('/user')
    .post(userController.register)
    .get(userController.readAll)

export default router
