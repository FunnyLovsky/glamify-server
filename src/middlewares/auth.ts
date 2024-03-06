import { NextFunction, Response } from 'express'
import ApiError from '../exceptions/api-error'
import tokenService from '../service/tokenService'
import { AuthRequest } from '../types/IUser'

export default function (req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const autorizateHeader = req.headers.authorization

        if (!autorizateHeader) {
            return next(ApiError.UnAutoriseError())
        }

        const accessToken = autorizateHeader.split(' ')[1]

        if (!accessToken) {
            return next(ApiError.UnAutoriseError())
        }

        const userData = tokenService.validateAccessToken(accessToken)

        if (!userData) {
            return next(ApiError.UnAutoriseError())
        }

        req.user = userData
        next()
    } catch (error) {
        return next(ApiError.UnAutoriseError())
    }
}
