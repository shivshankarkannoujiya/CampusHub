import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({}, {timestamps: true})

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema)