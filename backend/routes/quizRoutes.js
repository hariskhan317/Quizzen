import { Router } from 'express'
import { verifyToken } from '../utils/tokenManager.js';
import { generateQuestion } from '../controllers/quizController.js'
 
const quizRouter = Router();

quizRouter.get('/new', verifyToken, generateQuestion)


export default quizRouter;