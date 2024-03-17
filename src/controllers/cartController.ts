import { NextFunction, Request, Response } from 'express'
import { AuthRequest } from '../types/IUser'
import cartService from '../service/cartService'
import ApiError from '../exceptions/api-error'
import { IProductCart, ProductCartSchema } from '../types/ICart'
import { Types } from 'mongoose'

class CartController {
    async addProduct(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const productCart = req.body as ProductCartSchema
            const userId = req.user!.id

            const cart = await cartService.addProduct(productCart, userId)

            return res.status(200).json({ message: 'Товар добавлен в корзину!', cart })
        } catch (error) {
            next(error)
        }
    }

    async deleteProduct(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const productId = req.params.productId as unknown as Types.ObjectId
            const userId = req.user!.id

            const cart = await cartService.removeProduct(productId, userId)
            return res.status(200).json({ message: 'Товар удален из корзины!', cart })
        } catch (error) {
            next(error)
        }
    }

    async clearCart(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id

            const cart = await cartService.removeAllProducts(userId)
            return res.status(200).json({ message: 'Корзина очищена!', cart })
        } catch (error) {
            next(error)
        }
    }

    async getProducts(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id

            const cart = await cartService.getCartProducts(userId)

            return res.status(200).json({ cart })
        } catch (error) {
            next(error)
        }
    }

    async updateProducts(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { count, productId } = req.body
            const userId = req.user!.id

            const cart = await cartService.updateCartProducts(userId, count, productId)

            return res.status(200).json({ message: 'Товар обновлен!', cart })
        } catch (error) {
            next(error)
        }
    }
}

export default new CartController()
