import { Types } from "mongoose";
import Cart from "../models/Cart";
import { ICart, ProductCartSchema } from "../types/ICart";

class CartService {
    async createCart(userId: Types.ObjectId, products: ProductCartSchema) {
        const cart = await Cart.create({userId, products});
        
        return cart.products
    }
}

export default new CartService()