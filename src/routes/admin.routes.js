import { Router } from 'express';
import {
    listAllUsers,
    updateUserRole,
} from '../controllers/admin_only.controllers.js';
import {
    verifyAPI_KEY,
    authMiddleware,
    validatePermission,
} from '../middlewares/index.js';
import { userRolesEnum } from '../utils/constant.js';

const router = Router();

router
    .route('/users')
    .get(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        listAllUsers
    );

router
    .route('/users/:userId/role')
    .post(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        updateUserRole
    );

export default router;
