import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import authorizeRole from '../middlewares/roleMiddleware.js';

import userController from "../controllers/userControllers.js";
import adminController from "../controllers/adminControllers.js"

const router = express.Router()

router
    .route('/user')
    .get(protect, userController.readAll)

router
    .route('/user/:id')
    .get(protect, userController.readById)
    .put(protect, userController.updateById)
    .delete(protect, userController.delete)

router
    .route('/admin')
    .get(protect, authorizeRole('admin'), adminController.readAll)

router
    .route('/admin/:id')
    .get(protect, authorizeRole('admin'), adminController.readById)
    .put(protect, authorizeRole('admin'), adminController.updateById)
    .delete(protect, authorizeRole('admin'), adminController.delete)


export default router
