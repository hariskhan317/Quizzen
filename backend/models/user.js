import mongoose from "mongoose";

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
    quizzes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz'
        }
    ]
})

export const User = mongoose.model('User', userSchema);