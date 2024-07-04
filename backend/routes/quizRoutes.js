import { Router } from 'express'
import { verifyToken } from '../utils/tokenManager.js';
import { generateQuestion, getAllQuizQuestion, postQuizResult, getQuiz} from '../controllers/quizController.js'
 
const quizRouter = Router();

quizRouter.post('/new', verifyToken, generateQuestion);
quizRouter.get('/get-quizzes', verifyToken, getAllQuizQuestion);
quizRouter.get('/get-quiz/:id', verifyToken, getQuiz);
quizRouter.post('/quiz-result', verifyToken, postQuizResult);

export default quizRouter;