import { Router } from 'express';
import { createResult, getResults } from '../controllers/result.controllers.js';
import {
    verifyAPI_KEY,
    authMiddleware,
    validatePermission,
} from '../middlewares/index.js';
import { userRolesEnum } from '../utils/constant.js';

const router = Router();

router
    .route('/')
    .post(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        createResult
    );

router
    .route('/:studentId')
    .get(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([
            userRolesEnum.STUDENT,
            userRolesEnum.FACULTY,
            userRolesEnum.ADMIN,
        ]),
        getResults
    );

export default router;
