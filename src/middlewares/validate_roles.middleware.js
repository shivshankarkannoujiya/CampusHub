import {
    asyncHandler,
    ApiError,
    STATUS_CODES,
    ERROR_MESSAGES,
} from '../utils/index.js';

export const validatePermission = (roles = []) =>
    asyncHandler(async (req, _, next) => {
        const userRole = req.user?.role;
        if (!userRole) {
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                ERROR_MESSAGES.AUTH.ROLE_NOT_FOUND
            );
        }

        if (!roles.includes(userRole)) {
            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                ERROR_MESSAGES.AUTH.FORBIDDEN
            );
        }

        next();
    });
