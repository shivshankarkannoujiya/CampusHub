import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
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
            set: (value) => new Date(new Date(value).setHours(0, 0, 0, 0)),
        },

        isPresent: {
            type: Boolean,
            default: false,
        },

        markedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        
        remarks: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

// Indexes
attendanceSchema.index({ student: 1, course: 1, date: 1 }, { unique: true });
attendanceSchema.index({ course: 1, date: 1 });

export const Attendance = mongoose.model('Attendance', attendanceSchema);
