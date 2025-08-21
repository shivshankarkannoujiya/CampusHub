import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema({}, {timestamps: true})

export const Attendence = mongoose.model("Attendence", attendenceSchema)