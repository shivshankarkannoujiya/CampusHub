import { Router } from 'express';
import {
    verifyAPI_KEY,
    authMiddleware,
    validatePermission,
} from '../middlewares/index.js';
import { userRolesEnum } from '../utils/constant.js';
import {
    enrollStudentInCourse,
    getStudentsByCourse,
    getCoursesByStudent,
} from '../controllers/enrollment.controllers.js';

const router = Router();

router
    .route('/enroll')
    .post(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.STUDENT]),
        enrollStudentInCourse
    );

router
    .route('/:courseId/students')
    .get(verifyAPI_KEY, authMiddleware, getStudentsByCourse);

router
    .route('/:studentId/courses')
    .get(verifyAPI_KEY, authMiddleware, getCoursesByStudent);

export default router;
