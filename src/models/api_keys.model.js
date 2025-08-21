import mongoose from 'mongoose';

const apiKeySchema = new mongoose.Schema(
    {
        keyHash: {
            type: String,
            required: true,
            unique: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true
        },
        
        expiresAt: { type: Date },
    },
    { timestamps: true }
);

export const Apikey = mongoose.model('Apikey', apiKeySchema);
