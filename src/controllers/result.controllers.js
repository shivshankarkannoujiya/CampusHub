import { Result } from '../models/results.model.js';
import { userRolesEnum } from '../utils/constant.js';
import {
    asyncHandler,
    ApiError,
    ApiResponse,
    STATUS_CODES,
    SUCCESS_MESSAGES,
    ERROR_MESSAGES,
} from '../utils/index.js';

const createResult = asyncHandler(async (req, res) => {
    const { student, course, grade } = req.body;
    if (!student || !course || !grade) {
        throw new ApiError(
            STATUS_CODES.BAD_REQUEST,
            ERROR_MESSAGES.GENERAL.ALL_FIELDS_REQUIRED
        );
    }

    const result = await Result.create({
        student,
        course,
        grade,
        publishedBy: req.user._id,
    });

    return res
        .status(STATUS_CODES.CREATED)
        .json(
            new ApiResponse(
                STATUS_CODES.CREATED,
                { result: result },
                SUCCESS_MESSAGES.RESULT.CREATED
            )
        );
});

const getResults = asyncHandler(async (req, res) => {
    const { studentId } = req.params;
    const { role, _id: userId } = req.user;

    if (role === userRolesEnum.STUDENT && userId.toString() !== studentId) {
        throw new ApiError(
            STATUS_CODES.FORBIDDEN,
            ERROR_MESSAGES.RESULT.FORBIDDEN
        );
    }

    const results = await Result.find({ student: studentId });

    if (!results || results.length === 0) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.RESULT.NOT_FOUND
        );
    }

    return res
        .status(STATUS_CODES.OK)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                { results: results },
                SUCCESS_MESSAGES.RESULT.FETCHED
            )
        );
});

export { createResult, getResults };
