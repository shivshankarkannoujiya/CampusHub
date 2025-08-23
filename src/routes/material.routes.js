import { Router } from 'express';
import {
    verifyAPI_KEY,
    authMiddleware,
    validatePermission,
} from '../middlewares/index.js';
import { userRolesEnum } from '../utils/constant.js';
import {
    getMaterialsByCourse,
    uploadMaterial,
} from '../controllers/material.controllers.js';

const router = Router();

router
    .route('/courses/:courseId')
    .post(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.FACULTY, userRolesEnum.STUDENT]),
        uploadMaterial
    );

router
    .route('/courses/:courseId')
    .post(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.FACULTY]),
        getMaterialsByCourse
    );

export default router;
