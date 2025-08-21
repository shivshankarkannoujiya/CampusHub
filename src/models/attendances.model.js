import mongoose from 'mongoose';

const attendenceSchema = new mongoose.Schema(
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

        date: {
            type: Date,
            required: true,
        },

        isPresent: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

attendenceSchema.index({ student: 1, course: 1, date: 1 }, { unique: true });

export const Attendence = mongoose.model('Attendence', attendenceSchema);
