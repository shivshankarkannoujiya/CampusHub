import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
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

        enrollmentDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
