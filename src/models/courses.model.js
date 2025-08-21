import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
    {
        courseCode: {
            type: String,
            required: true,
            unique: true,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Course = mongoose.model('Course', courseSchema);
