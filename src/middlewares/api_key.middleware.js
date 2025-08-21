import { Apikey } from '../models/api_keys.model.js';
import { ApiError } from '../utils/api-error.js';
import { asyncHandler } from '../utils/async-handler.js';
import crypto from 'crypto';

const verifyAPI_KEY = asyncHandler(async (req, _, next) => {
    const api_key = req.headers['x-api-key'];
    if (!api_key) {
        throw new ApiError(401, 'API Key missing');
    }

    const heashedApiKey = crypto
        .createHash('sha256')
        .update(api_key)
        .digest('hex');

    const existingApiKey = await Apikey.findOne({
        key: heashedApiKey,
        isActive: true,
    });

    if (!existingApiKey) {
        throw new ApiError(401, 'Invalid or inactive API Key');
    }

    if (existingApiKey.expiresAt <= new Date()) {
        existingApiKey.isActive = false;
        await existingApiKey.save();
        throw new ApiError(401, 'API Key has expired');
    }

    req.apiKey = { user: existingApiKey.user, _id: existingApiKey._id };
    next();
});

export { verifyAPI_KEY };
