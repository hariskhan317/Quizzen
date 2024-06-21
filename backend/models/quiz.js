import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    questions: [{
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
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const Quiz = mongoose.model('Quiz', quizSchema);