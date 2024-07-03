import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
    option: {
        type: String,
        required: true,
    },
    // Optionally add more fields like timestamp, user ID, etc.
});

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    choices: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: [String], // If multiple correct answers are possible
        required: true,
    },
    selectedOptions: [optionSchema], // Array of embedded documents
});

const quizSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    questions: [questionSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        default: 0, // Default score to 0
    },
});

export const Quiz = mongoose.model('Quiz', quizSchema);
