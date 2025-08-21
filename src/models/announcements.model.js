import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        content: {
            type: String,
            required: true,
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

export const Announcement = mongoose.model('Announcement', announcementSchema);
