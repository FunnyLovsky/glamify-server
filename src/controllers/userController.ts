import { NextFunction, Request, Response } from 'express'
import userService from '../service/userService'
import tokenService from '../service/tokenService'
import { AuthRequest } from '../types/IUser'

class UserControllers {
    async registration(reg: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, name, products } = reg.body
            const userData = await userService.registration(email, password, name, products)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 3600 * 1000,
                httpOnly: true,
            })
            return res.status(200).json(userData)
        } catch (error: any) {
            next(error)
        }
    }

    async login(reg: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = reg.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 3600 * 1000,
                httpOnly: true,
            })
            return res.status(200).json(userData)
        } catch (error) {
            next(error)
        }
    }

    async logout(reg: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = reg.cookies
            const message = await tokenService.removeToken(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200).json(message)
        } catch (error) {
            next(error)
        }
    }

    async refresh(reg: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = reg.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 3600 * 1000,
                httpOnly: true,
            })
            return res.status(200).json(userData)
        } catch (error) {
            next(error)
        }
    }

    async auth(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.user!
            const userData = await userService.auth(id)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 3600 * 1000,
                httpOnly: true,
            })
            return res.status(200).json(userData)
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(reg: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { email } = reg.user!
            const message = await userService.deleteUser(email)

            return res.status(200).json(message)
        } catch (error) {
            next(error)
        }
    }
}

export default new UserControllers()
