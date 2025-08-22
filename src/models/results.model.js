import mongoose from 'mongoose';
import { AvailablegradeValues } from '../utils/constant.js';

const resultSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },

        grade: {
            type: String,
            enum: AvailablegradeValues,
            required: true,
        },

        publishedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },

        publishedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export const Result = mongoose.model('Result', resultSchema);
