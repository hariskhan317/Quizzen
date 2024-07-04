import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import appRouter from './routes/index.js'
// https://quizzen-frontend.vercel.app/
// origin: ["http://localhost:5173"],
config();
const app = express();
app.use(cors({
    origin: ["https://quizzen-frontend-git-master-hariskhan317s-projects.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use("/api/v1", appRouter)


export default app;