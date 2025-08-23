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

    ENROLLMENT: {
        ALREADY_ENROLLED: 'This student is already enrolled in this course',
        NO_ENROLLMENTS: 'No students found for this course',
        STUDENT_NOT_ENROLLED_ANY_COURSE: 'No courses found for this student',
    },

    USER: {
        ALREADY_EXISTS: 'User already registered with this email',
        NOT_FOUND: 'User not found',
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

    EVENT: {
        INVALID_DATE: 'Invalid date format. Use a valid ISO date string',
        START_BEFORE_END: 'startTime must be earlier than endTime',
        EVENT_NOT_FOUND: 'Event not found',
        NO_UPCOMMING_EVENT: 'There is not upcomming events',
        NO_PAST_EVENT: 'There is not upcomming events',
    },

    GENERAL: {
        ALL_FIELDS_REQUIRED: 'All fields are required',
        INVALID_INPUT: 'Invalid input data',
        SERVER_ERROR: 'Something went wrong, please try again later',
    },
};
