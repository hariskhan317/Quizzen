import { body, validationResult } from 'express-validator'

export const loginValidator = () => {
    return [
        body('email')
            .isEmail().withMessage('Should be Email')
            .notEmpty().withMessage('Email is Required'),
        body('password')
            .notEmpty().withMessage('Password is Required')
            .isLength({ min: 3 }).withMessage('Password lenght is short')
    ]
}

export const signupValidator = () => {
    return [
        body('name')
            .notEmpty().withMessage('Email is Required')
            .isLength({ min: 2 }).withMessage('Name lenght is short'),
        loginValidator()
    ]
}

export const validator =  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const errMessage = errors.array().map(err => err.msg);
    return res.status(422).json({ errMessage });
}