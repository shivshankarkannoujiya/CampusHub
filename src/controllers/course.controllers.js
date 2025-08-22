import { Course } from '../models/courses.model.js';
import {
    asyncHandler,
    ApiError,
    ApiResponse,
    STATUS_CODES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} from '../utils/index.js';

const createCourse = asyncHandler(async (req, res) => {
    const { title, description, courseCode } = req.body;
    if (!title || !description || !courseCode) {
        throw new ApiError(
            STATUS_CODES.BAD_REQUEST,
            ERROR_MESSAGES.GENERAL.ALL_FIELDS_REQUIRED
        );
    }

    const existingCourse = await Course.findOne({
        $or: [{ title }, { courseCode }],
    });
    if (existingCourse) {
        throw new ApiError(
            STATUS_CODES.CONFLICT,
            ERROR_MESSAGES.COURSE.ALREADY_EXISTS
        );
    }

    const course = await Course.create({
        title,
        description,
        courseCode,
        createdBy: req.user?._id,
    });

    return res
        .status(STATUS_CODES.CREATED)
        .json(
            new ApiResponse(
                STATUS_CODES.CREATED,
                { course: course },
                SUCCESS_MESSAGES.COURSE.CREATED
            )
        );
});

const getAllCourses = asyncHandler(async (_, res) => {
    const courses = await Course.find();
    if (!courses || courses.length === 0) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.COURSE.NOT_FOUND
        );
    }

    return res
        .status(STATUS_CODES.OK)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                { courses },
                SUCCESS_MESSAGES.COURSE.FETCHED
            )
        );
});

const deleteCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    const course = await Course.findByIdAndUpdate(
        courseId,
        { isActive: false },
        { new: true, runValidators: false }
    );

    if (!course) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.COURSE.NOT_FOUND
        );
    }

    return res
        .status(STATUS_CODES.OK)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                { course },
                SUCCESS_MESSAGES.COURSE.DELETED
            )
        );
});



export { createCourse, getAllCourses, deleteCourse };
