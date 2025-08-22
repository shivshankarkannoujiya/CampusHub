import { User } from '../models/users.model.js';
import {
    ApiError,
    ApiResponse,
    asyncHandler,
    STATUS_CODES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} from '../utils/index.js';

const listAllUsers = asyncHandler(async (_, res) => {
    const users = await User.find().select('-password -refreshToken');
    if (!users || users.length === 0) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.USER.NOT_FOUND
        );
    }
    return res
        .status(STATUS_CODES.OK)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                { users },
                SUCCESS_MESSAGES.USER.FETCHED
            )
        );
});

const updateUserRole = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                role: role,
            },
        },
        { new: true }
    );

    if (!user) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.USER.NOT_FOUND
        );
    }

    return res
        .status(STATUS_CODES.OK)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                { user },
                SUCCESS_MESSAGES.USER.ROLE_UPDATED
            )
        );
});

export { listAllUsers, updateUserRole };
