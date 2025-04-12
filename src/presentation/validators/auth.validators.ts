import { Request, Response, NextFunction } from 'express';
import { body, check, param, validationResult } from 'express-validator';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => ({
            message: err.msg as string
        }));

        res.status(400).json({
            statusCode: 400,
            message: errorMessages[0].message
        })
        // throw new Error(errorMessages[0].message)
    }
    next();
};

export const loginValidator = [
    body('email').
        isEmail().withMessage('Email must be valid').
        notEmpty().withMessage('Email is required'),

    body('password').notEmpty().withMessage('Password is required'),
    validateRequest
];

export const registerValidator = [
    body('email').
        isEmail().withMessage('Email must be valid').
        notEmpty().withMessage('Email is required'),

    body("firstName").notEmpty().withMessage("First Name is required"),
    body("lastName").notEmpty().withMessage("Last Name is required"),
    body('password').notEmpty().withMessage('Password is required'),
    validateRequest,
];

export const verifyEmailValidator = [
    check('verificationToken')
        .exists()
        .withMessage('Verification token is required'),
    validateRequest,
]

export const resetPasswordValidator = [
    check('verificationToken')
        .exists()
        .withMessage('Verification token is required'),
    body("newPassword").notEmpty().withMessage('Password is required'),
    validateRequest,
]

export const forgotPasswordValidator = [
    body('email').
        isEmail().withMessage('Email must be valid').
        notEmpty().withMessage('Email is required'),
    validateRequest,
]