import mongoose from 'mongoose';
import {
    asyncHandler,
    ApiResponse,
    STATUS_CODES,
    SUCCESS_MESSAGES,
} from '../utils/index.js';

const formatUptime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
};

const healthCheck = asyncHandler(async (req, res) => {
    const dbStatus =
        mongoose.connection.readyState === 1 ? `Connected` : `Disconnected`;
    return res.status(STATUS_CODES.OK).json(
        new ApiResponse(
            STATUS_CODES.OK,
            {
                uptime: formatUptime(process.uptime()),
                timestamp: new Date().toISOString(),
                database: dbStatus,
            },
            SUCCESS_MESSAGES.GENERAL.HEALTHY
        )
    );
});

export { healthCheck };
