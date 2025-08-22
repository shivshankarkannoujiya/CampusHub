const userRolesEnum = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
};

const gradeValuesEnum = {
    'A+': 10,
    A: 9,
    'A-': 8,
    'B+': 7,
    B: 6,
    'B-': 5,
    'C+': 4,
    C: 3,
    D: 2,
    F: 0,
};

const AvailableUserRoles = Object.values(userRolesEnum);
const AvailablegradeValues = Object.values(gradeValuesEnum);

const DB_NAME = 'campushub';
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
};

export {
    userRolesEnum,
    AvailableUserRoles,
    gradeValuesEnum,
    AvailablegradeValues,
    DB_NAME,
    cookieOptions,
};
