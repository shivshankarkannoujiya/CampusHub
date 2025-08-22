const userRolesEnum = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
};

const AvailableUserRoles = Object.values(userRolesEnum);

const DB_NAME = 'campushub';
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
};

export { userRolesEnum, AvailableUserRoles, DB_NAME, cookieOptions };
