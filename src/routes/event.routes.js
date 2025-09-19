import { Router } from 'express';
import {
    createEvent,
    getAllEvent,
    getEventById,
    getUpcommingEvents,
    getPastEvents,
} from '../controllers/event.controllers.js';
import {
    verifyAPI_KEY,
    authMiddleware,
    validatePermission,
} from '../middlewares/index.js';
import { userRolesEnum } from '../utils/constant.js';

const router = Router();

router
    .route('/create')
    .post(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission[(userRolesEnum.ADMIN, userRolesEnum.FACULTY)],
        createEvent
    );

router
    .route('/allevents')
    .get(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission[
            (userRolesEnum.ADMIN, userRolesEnum.FACULTY, userRolesEnum.STUDENT)
        ],
        getAllEvent
    );

router
    .route('/:eventId')
    .get(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission[
            (userRolesEnum.ADMIN, userRolesEnum.FACULTY, userRolesEnum.STUDENT)
        ],
        getEventById
    );

router
    .route('/upcomming')
    .get(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission[
            (userRolesEnum.ADMIN, userRolesEnum.FACULTY, userRolesEnum.STUDENT)
        ],
        getUpcommingEvents
    );

router
    .route('/past')
    .get(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission[
            (userRolesEnum.ADMIN, userRolesEnum.FACULTY, userRolesEnum.STUDENT)
        ],
        getPastEvents
    );

export default router;
