import { Router } from 'express';
import {
    registerUser,
    loginUser,
    generateApiKey,
    getCurrentUser,
    logoutUser,
} from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { verifyAPI_KEY } from '../middlewares/api_key.middleware.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/api-key').post(authMiddleware, generateApiKey);
router.route('/me').get(authMiddleware, verifyAPI_KEY, getCurrentUser);
router.route('/logout').post(authMiddleware, verifyAPI_KEY, logoutUser);

export default router;
