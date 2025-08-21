import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema({}, {timestamps: true})

export const Apikey = mongoose.model("Apikey", apiKeySchema)