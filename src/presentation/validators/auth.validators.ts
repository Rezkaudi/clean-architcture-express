import { Request, Response, NextFunction } from 'express';
import { body, check, validationResult } from 'express-validator';

import { ApplicationResponse } from '../../application/response/application-resposne';


export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => ({
            message: err.msg as string
        }));

        return new ApplicationResponse(res, {
            statusCode: 400,
            success: false,
            data: {},
            message: errorMessages[0].message
        }).send()

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

export const resendVerifyEmailValidator = [
    body('email').
        isEmail().withMessage('Email must be valid').
        notEmpty().withMessage('Email is required'),
    validateRequest,
]

export const updatePasswordValidator = [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').notEmpty().withMessage('New password is required'),
    validateRequest,
]