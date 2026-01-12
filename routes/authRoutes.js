import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import authController from "../controllers/authController.js";

const router = express.Router()

router
    .route('/auth/login')
    .post(authController.login)

router
    .route('/auth/register')
    .post(authController.register)

export default router
