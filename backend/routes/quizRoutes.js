import { Router } from 'express'
import { verifyToken } from '../utils/tokenManager.js';
import { generateQuestion, getAllQuizQuestion} from '../controllers/quizController.js'
 
const quizRouter = Router();

quizRouter.post('/new', verifyToken, generateQuestion)
quizRouter.get('/get-quizzes', verifyToken, getAllQuizQuestion)

export default quizRouter;