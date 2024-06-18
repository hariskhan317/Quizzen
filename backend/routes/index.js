import { Router } from 'express';
import userRouter from './userRoutes.js'
import quizRouter from './quizRoutes.js'
const appRouter = Router();

appRouter.use('/user', userRouter)
appRouter.use('/quiz', quizRouter)

export default appRouter;