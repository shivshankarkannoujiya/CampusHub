import { Event } from '../models/events.model.js';
import {
    ApiError,
    ApiResponse,
    asyncHandler,
    STATUS_CODES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} from '../utils/index.js';

const createEvent = asyncHandler(async (req, res) => {
    const { title, description, startTime, endTime } = req.body;

    if (!title || !startTime || !endTime) {
        throw new ApiError(
            STATUS_CODES.BAD_REQUEST,
            ERROR_MESSAGES.GENERAL.ALL_FIELDS_REQUIRED
        );
    }

    const start_time = new Date(startTime);
    const end_time = new Date(endTime);

    if (isNaN(start_time) || isNaN(end_time)) {
        throw new ApiError(
            STATUS_CODES.BAD_REQUEST,
            ERROR_MESSAGES.EVENT.INVALID_DATE
        );
    }

    if (start_time >= end_time) {
        throw new ApiError(
            STATUS_CODES.BAD_REQUEST,
            ERROR_MESSAGES.EVENT.START_BEFORE_END
        );
    }

    const event = await Event.create({
        title,
        description,
        startTime: start_time,
        endTime: end_time,
        organizer: req.user?._id,
    });

    return res
        .status(STATUS_CODES.CREATED)
        .json(
            new ApiResponse(
                STATUS_CODES.CREATED,
                { event },
                SUCCESS_MESSAGES.EVENT.CREATED
            )
        );
});

const getAllEvent = asyncHandler(async (_, res) => {
    const events = await Event.find()
        .populate('organizer', 'fullname email')
        .sort({ startTime: 1 });

    if (!events || events.length === 0) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.EVENT.EVENT_NOT_FOUND
        );
    }

    return res
        .status(STATUS_CODES.OK)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                { events },
                SUCCESS_MESSAGES.EVENT.FETCHED_ALL
            )
        );
});

const getEventById = async(async (req, res) => {
    const { eventId } = req.params;
    const event = await Event.findById(eventId).populate(
        'organizer',
        'fullname email'
    );

    if (!event) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.EVENT.EVENT_NOT_FOUND
        );
    }

    return res
        .status(STATUS_CODES.OK)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                { event },
                SUCCESS_MESSAGES.EVENT.FETCHED
            )
        );
});

const getUpcommingEvents = asyncHandler(async (req, res) => {
    const currentDate = Date.now();
    const upcommingEvents = await Event.find({
        startTime: { $gt: currentDate },
    })
        .populate('organizer', 'fullname email')
        .sort({ startTime: 1 });

    if (!upcommingEvents) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.EVENT.NO_UPCOMMING_EVENT
        );
    }

    return res
        .status(STATUS_CODES.OK)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                { upcommingEvents },
                SUCCESS_MESSAGES.EVENT.UPCOMMING_EVENT_FETCHED
            )
        );
});

const getPastEvents = asyncHandler(async (req, res) => {
    const currentDate = Date.now();
    const pastEvents = await Event.find({
        endTime: { $lt: currentDate },
    })
        .populate('organizer', 'fullname email')
        .sort({ endTime: -1 });

    if (!pastEvents) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.EVENT.NO_PAST_EVENT
        );
    }

    return res
        .status(STATUS_CODES.OK)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                { pastEvents },
                SUCCESS_MESSAGES.EVENT.PAST_EVENT_FETCHED
            )
        );
});

export {
    createEvent,
    getAllEvent,
    getEventById,
    getUpcommingEvents,
    getPastEvents,
};
