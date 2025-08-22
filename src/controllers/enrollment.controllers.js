import { Enrollment } from '../models/enrollments.model.js';
import { Course } from '../models/courses.model.js';
import { User } from '../models/users.model.js';
import {
    ApiError,
    ApiResponse,
    asyncHandler,
    STATUS_CODES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} from '../utils/index.js';
import { userRolesEnum } from '../utils/constant.js';

const enrollStudentInCourse = asyncHandler(async (req, res) => {
    const { studentId, courseId } = req.body;
    const student = await User.findById(studentId);

    if (!student || student.role !== userRolesEnum.STUDENT) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.USER.NOT_FOUND
        );
    }

    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.COURSE.NOT_FOUND
        );
    }

    const alreadyEnrolled = await Enrollment.findOne({
        $or: [{ student }, { course }],
    });

    if (alreadyEnrolled) {
        throw new ApiError(
            STATUS_CODES.CONFLICT,
            ERROR_MESSAGES.ENROLLMENT.ALREADY_ENROLLED
        );
    }

    const newEnrollment = await Enrollment.create({
        student: studentId,
        course: courseId,
    });

    return res
        .status(STATUS_CODES.CREATED)
        .json(
            new ApiResponse(
                STATUS_CODES.CREATED,
                { newEnrollment },
                SUCCESS_MESSAGES.ENROLLMENT.ENROLLED
            )
        );
});

const getStudentsByCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const enrollments = await Enrollment.find({ course: courseId })
        .populate('student', 'username fullname email')
        .select('student');

    if (enrollments.length === 0) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.ENROLLMENT.NO_ENROLLMENTS
        );
    }

    const students = enrollments.map((e) => e.student);

    return res
        .status(STATUS_CODES.OK)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                { students, enrollments },
                SUCCESS_MESSAGES.ENROLLMENT.ENROLLED_STUDENT_FETCHED
            )
        );
});

const getCoursesByStudent = asyncHandler(async (req, res) => {
    const { studentId } = req.params;
    const { role, _id: userId } = req.user;

    if (role === userRolesEnum.STUDENT && userId !== studentId) {
        throw new ApiError(
            STATUS_CODES.FORBIDDEN,
            ERROR_MESSAGES.AUTH.FORBIDDEN
        );
    }

    const enrollments = await Enrollment.find({ student: studentId })
        .populate('course', 'title courseCode')
        .select('course');

    if (!enrollments || enrollments.length === 0) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.ENROLLMENT.STUDENT_NOT_ENROLLED_ANY_COURSE
        );
    }

    const courses = enrollments.map((e) => e.course);

    return res
        .status(STATUS_CODES.OK)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                { courses, enrollments },
                SUCCESS_MESSAGES.ENROLLMENT.ENROLLED_COURSES_FETCHED
            )
        );
});

export { enrollStudentInCourse, getStudentsByCourse, getCoursesByStudent };
