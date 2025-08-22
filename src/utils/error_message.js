export const ERROR_MESSAGES = {
    AUTH: {
        INVALID_CREDENTIALS: 'Invalid email or password',
        UNAUTHORIZED: 'Authentication required',
        FORBIDDEN: 'You do not have permission to access this resource',
        INVALID_API_KEY: 'API key is missing or invalid',
        TOKEN_EXPIRED: 'Session expired, please login again',
        INVALID_TOKEN: 'Malformed or invalid token',
        ROLE_NOT_FOUND: 'User role not found in request',
    },

    USER: {
        ALREADY_EXISTS: 'User already registered with this email',
        NOT_FOUND: 'User not found',
        ROLE_UPDATE_FORBIDDEN: 'Cannot change role for this user',
    },

    ANNOUNCEMENT: {
        NOT_FOUND: 'Announcement not found',
        FORBIDDEN: 'Only faculty or admin can post announcements',
    },

    RESULT: {
        NOT_FOUND: 'Result not found',
        FORBIDDEN: 'You are not authorized to view these results',
    },

    COURSE: {
        NOT_FOUND: 'Course not found',
        ALREADY_EXISTS: 'Course already created with this title',
        COURSE_MATERIAL_MISSING: 'Course material is missing',
        MATERIAL_NOT_FOUND: 'Course material not found',
    },

    GENERAL: {
        ALL_FIELDS_REQUIRED: 'All fields are required',
        INVALID_INPUT: 'Invalid input data',
        SERVER_ERROR: 'Something went wrong, please try again later',
    },
};
