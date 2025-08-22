import { User } from '../models/users.model.js';
import {
    asyncHandler,
    ApiError,
    STATUS_CODES,
    ERROR_MESSAGES,
} from '../utils/index.js';

import jwt from 'jsonwebtoken';

const authMiddleware = asyncHandler(async (req, _, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            ERROR_MESSAGES.AUTH.UNAUTHORIZED
        );
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select(
            '-password -refreshToken'
        );
        if (!user) {
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                ERROR_MESSAGES.AUTH.UNAUTHORIZED
            );
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication Error: ', error);

        if (error.name === 'TokenExpiredError') {
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                ERROR_MESSAGES.AUTH.TOKEN_EXPIRED
            );
        }

        if (error.name === 'JsonWebTokenError') {
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                ERROR_MESSAGES.AUTH.INVALID_TOKEN
            );
        }
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            ERROR_MESSAGES.AUTH.UNAUTHORIZED
        );
    }
});

export { authMiddleware };
