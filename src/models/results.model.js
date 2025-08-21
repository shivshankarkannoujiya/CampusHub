import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({}, {timestamps: true})

export const Result = mongoose.model("Result", resultSchema)