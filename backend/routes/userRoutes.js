import { Router } from 'express'
import { getUser, userSignup, userLogin } from '../controllers/userController.js'
import { signupValidator, validator, loginValidator } from '../utils/validator.js'


const userRouter = Router();

userRouter.get('/', getUser);
userRouter.post('/signup', signupValidator(), validator, userSignup);
userRouter.post('/login', loginValidator(), validator,  userLogin);


export default userRouter;