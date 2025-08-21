import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({}, {timestamps: true})

export const Material = mongoose.model("Material", materialSchema)