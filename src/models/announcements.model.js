import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({}, { timestamps: true });

export const Announcement = mongoose.model('Announcement', announcementSchema);
