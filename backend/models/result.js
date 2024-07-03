import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    selectedOptions: {
        type: String[],
        required: true
    }
})

export const Result = mongoose.model('Result', resultSchema);