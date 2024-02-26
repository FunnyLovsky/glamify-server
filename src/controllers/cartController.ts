import { NextFunction, Request, Response } from "express";
import { ICart } from "../types/ICart";
import Cart from "../models/Cart";

class CartController {
    async createCart(req: Request, res: Response, next: NextFunction) {
        try {
            const {products, userId} = req.body as ICart;

            const cart = await Cart.create({userId, products: []});

            return res.status(200).json({message: 'Корзина создана!', cart})
        } catch (error) {
            next(error)
        }
    }
}

export default new CartController();