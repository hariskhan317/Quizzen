import { Router } from 'express'
import { verifyToken } from '../utils/tokenManager.js';
import { getUser, userSignup, userLogin, authStatusHandler } from '../controllers/userController.js'
import { signupValidator, validator, loginValidator } from '../utils/validator.js'


const userRouter = Router();

userRouter.get('/', getUser);
userRouter.get('/authStatus', verifyToken, authStatusHandler);
userRouter.post('/signup', signupValidator(), validator, userSignup);
userRouter.post('/login', loginValidator(), validator,  userLogin);


export default userRouter;