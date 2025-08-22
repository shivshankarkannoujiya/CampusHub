import { User } from '../models/users.model.js';
import { Apikey } from '../models/api_keys.model.js';
import { userRolesEnum, cookieOptions } from '../utils/constant.js';
import {
    asyncHandler,
    ApiError,
    ApiResponse,
    STATUS_CODES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    generateAccessAndRefreshToken,
} from '../utils/index.js';
import crypto from 'crypto';

const registerUser = asyncHandler(async (req, res) => {
    const { username, fullname, email, password, role } = req.body;
    if (
        ![username, fullname, email, password].every(
            (field) => field && field.trim() !== ''
        )
    ) {
        throw new ApiError(
            STATUS_CODES.BAD_REQUEST,
            ERROR_MESSAGES.GENERAL.ALL_FIELDS_REQUIRED
        );
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (existingUser) {
        throw new ApiError(
            STATUS_CODES.CONFLICT,
            ERROR_MESSAGES.USER.ALREADY_EXISTS
        );
    }

    const user = await User.create({
        username,
        fullname,
        email,
        password,
        role: role || userRolesEnum.STUDENT,
    });

    const createdUser = await User.findById(user._id).select(
        '-password -refreshToken'
    );

    if (!createdUser) {
        throw new ApiError(
            STATUS_CODES.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.GENERAL.SERVER_ERROR
        );
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                STATUS_CODES.CREATED,
                { user: createdUser },
                SUCCESS_MESSAGES.AUTH.REGISTERED
            )
        );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(
            STATUS_CODES.BAD_REQUEST,
            ERROR_MESSAGES.GENERAL.ALL_FIELDS_REQUIRED
        );
    }

    const user = await User.findOne({ email });
    if (!user) {
        new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND);
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);
    if (!isPasswordMatch) {
        throw new ApiError(
            STATUS_CODES.BAD_REQUEST,
            ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS
        );
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        '-password -refreshToken'
    );

    return res
        .status(STATUS_CODES.OK)
        .cookie('accessToken', accessToken, cookieOptions)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                {
                    user: loggedInUser,
                    accessToken: accessToken,
                },
                SUCCESS_MESSAGES.AUTH.LOGGED_IN
            )
        );
});

const generateApiKey = asyncHandler(async (req, res) => {
    const rawApiKey = `sk_ch_${crypto.randomBytes(32).toString('hex')}`;
    const hashedApiKey = crypto
        .createHash('sha256')
        .update(rawApiKey)
        .digest('hex');

    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const api_key = await Apikey.create({
        keyHash: hashedApiKey,
        user: req.user?._id,
        isActive: true,
        expiresAt: expiresAt,
    });

    return res
        .status(STATUS_CODES.CREATED)
        .json(
            new ApiResponse(
                STATUS_CODES.CREATED,
                { api_key: rawApiKey, expiresAt: api_key._id },
                SUCCESS_MESSAGES.AUTH.API_KEY_CREATED
            )
        );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(STATUS_CODES.OK)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                { user: req.user },
                SUCCESS_MESSAGES.USER.FETCHED
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: { refreshToken: null },
        },
        { new: true }
    );

    return res
        .status(STATUS_CODES.OK)
        .clearCookie('accessToken', cookieOptions)
        .clearCookie('refreshToken', cookieOptions)
        .json(
            new ApiResponse(
                STATUS_CODES.OK,
                {},
                SUCCESS_MESSAGES.AUTH.LOGGED_OUT
            )
        );
});

export { registerUser, loginUser, generateApiKey, getCurrentUser, logoutUser };
