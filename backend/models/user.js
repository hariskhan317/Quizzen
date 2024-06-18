import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    choices: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    quiz: [quizSchema]
})

export const User = mongoose.model('User', userSchema);