import { Router } from 'express';
import {
    verifyAPI_KEY,
    authMiddleware,
    validatePermission,
} from '../middlewares/index.js';
import { userRolesEnum } from '../utils/constant.js';
import {
    createCourse,
    deleteCourse,
    getAllCourses,
} from '../controllers/course.controllers.js';

const router = Router();

router
    .route('/')
    .post(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        createCourse
    );

router
    .route('/:courseId')
    .delete(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        deleteCourse
    );

router.route('/').get(verifyAPI_KEY, authMiddleware, getAllCourses);

export default router;
