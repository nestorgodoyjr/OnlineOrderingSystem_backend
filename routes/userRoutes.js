import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import userController from "../controllers/userControllers.js";

const router = express.Router()

router
    .route('/user')
    .get(protect, userController.readAll)

router
    .route('/user/:id')
    .get(protect, userController.readById)
    .put(protect, userController.updateById)
    .delete(protect, userController.delete)

export default router
