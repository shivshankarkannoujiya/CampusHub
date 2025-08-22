import { Router } from 'express';
import {
    verifyAPI_KEY,
    authMiddleware,
    validatePermission,
} from '../middlewares/index.js';
import { userRolesEnum } from '../utils/constant.js';
import {
    createAnnouncement,
    getAnnouncements,
} from '../controllers/annouuncement.controllers.js';

const router = Router();

router
    .route('/')
    .post(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.ADMIN, userRolesEnum.FACULTY]),
        createAnnouncement
    );

router.route('/').get(verifyAPI_KEY, authMiddleware, getAnnouncements);

export default router;
