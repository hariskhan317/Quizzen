import { Router } from 'express'
import { verifyToken } from '../utils/tokenManager.js';
import { generateQuestion, getAllQuizQuestion, postQuizResult} from '../controllers/quizController.js'
 
const quizRouter = Router();

quizRouter.post('/new', verifyToken, generateQuestion);
quizRouter.get('/get-quizzes', verifyToken, getAllQuizQuestion);
quizRouter.post('/quiz-result', verifyToken, postQuizResult);

export default quizRouter;