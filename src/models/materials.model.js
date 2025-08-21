import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        fileUrl: {
            type: String,
            required: true,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

export const Material = mongoose.model('Material', materialSchema);
