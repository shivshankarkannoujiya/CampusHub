import { Attendence } from '../models/attendances.model.js';
import {
    ApiError,
    ApiResponse,
    asyncHandler,
    STATUS_CODES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} from '../utils/index.js';

const markAttendance = asyncHandler(async (req, res) => {
    const { student, course, date, isPresent, remarks } = req.body;

    if (!student || !course || !date) {
        throw new ApiError(
            STATUS_CODES.BAD_REQUEST,
            ERROR_MESSAGES.GENERAL.ALL_FIELDS_REQUIRED
        );
    }

    const normalizeDate = new Date(new Date(date).setHours(0, 0, 0, 0));

    const attendance = await Attendence.findOneAndUpdate(
        { student, course, date: normalizeDate },
        {
            student,
            course,
            date: normalizeDate,
            isPresent: Boolean(isPresent),
            remarks,
            markedBy: req.user?._id,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res
        .status(STATUS_CODES.CREATED)
        .json(
            new ApiResponse(
                STATUS_CODES.CREATED,
                { attendance },
                SUCCESS_MESSAGES.ATTENDANCE.MARKED
            )
        );
});

export { markAttendance };
