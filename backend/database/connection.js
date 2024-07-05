import mongoose from "mongoose";

export const databaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 seconds timeout
        });
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error; // Re-throw the error to handle it in the caller
    }
};