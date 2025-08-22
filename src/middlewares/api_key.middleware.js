import { Apikey } from '../models/api_keys.model.js';
import {
    asyncHandler,
    ApiError,
    STATUS_CODES,
    ERROR_MESSAGES,
} from '../utils/index.js';
import crypto from 'crypto';

const verifyAPI_KEY = asyncHandler(async (req, _, next) => {
    const api_key = req.headers['x-api-key'];
    if (!api_key) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            ERROR_MESSAGES.AUTH.INVALID_API_KEY
        );
    }

    const hashedApiKey = crypto
        .createHash('sha256')
        .update(api_key)
        .digest('hex');

    const existingApiKey = await Apikey.findOne({
        keyHash: hashedApiKey,
        isActive: true,
    });

    if (!existingApiKey) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            ERROR_MESSAGES.AUTH.INVALID_API_KEY
        );
    }

    if (existingApiKey.expiresAt && existingApiKey.expiresAt <= new Date()) {
        existingApiKey.isActive = false;
        await existingApiKey.save();
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            ERROR_MESSAGES.AUTH.INVALID_API_KEY
        );
    }

    req.apiKey = { user: existingApiKey.user, _id: existingApiKey._id };
    next();
});

export { verifyAPI_KEY };
