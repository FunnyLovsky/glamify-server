import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import ApiError from '../exceptions/api-error'

const validateMiddleware = [
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 10 }),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error: any) => `${error.path}: ${error.msg}`)
            return next(ApiError.ValidationFailed('Ошибка при регистрации', errorMessages))
        }
        next()
    },
]

export default validateMiddleware
