import { Announcement } from '../models/announcements.model.js';
import {
    asyncHandler,
    ApiError,
    ApiResponse,
    STATUS_CODES,
    SUCCESS_MESSAGES,
    ERROR_MESSAGES,
} from '../utils/index.js';

const createAnnouncement = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user?._id;

    if (!title || !description) {
        throw new ApiError(
            STATUS_CODES.BAD_REQUEST,
            ERROR_MESSAGES.GENERAL.ALL_FIELDS_REQUIRED
        );
    }

    const announcement = await Announcement.create({
        title,
        description,
        author: userId,
    });

    return res
        .status(STATUS_CODES.CREATED)
        .json(
            new ApiResponse(
                STATUS_CODES.CREATED,
                { announcement: announcement },
                SUCCESS_MESSAGES.ANNOUNCEMENT.CREATED
            )
        );
});

const getAnnouncements = asyncHandler(async (_, res) => {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    if (announcements.length <= 0) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.ANNOUNCEMENT.NOT_FOUND
        );
    }

    return res
        .status(STATUS_CODES.OK)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                { announcements },
                SUCCESS_MESSAGES.ANNOUNCEMENT.FETCHED
            )
        );
});

export { createAnnouncement, getAnnouncements };
