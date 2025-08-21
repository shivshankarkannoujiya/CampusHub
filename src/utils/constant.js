const userRolesEnum = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
};

const AvailableUserRoles = Object.values(userRolesEnum);

const DB_NAME = 'campushub';

export { userRolesEnum, AvailableUserRoles, DB_NAME };
