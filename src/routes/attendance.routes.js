import { Router } from 'express';
import {
    verifyAPI_KEY,
    authMiddleware,
    validatePermission,
} from '../middlewares/index.js';
import { userRolesEnum } from '../utils/constant.js';
import { markAttendance } from '../controllers/attendence.controllers.js';

const router = Router();

router
    .route('/mark')
    .post(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.ADMIN, userRolesEnum.FACULTY]),
        markAttendance
    );

export default router;
