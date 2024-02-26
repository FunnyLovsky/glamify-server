import { Types } from "mongoose";
import Cart from "../models/Cart";
import { ProductCartSchema } from "../types/ICart";
import ApiError from "../exceptions/api-error";

class CartService {
    async createCart(userId: Types.ObjectId, products: ProductCartSchema[] | null) {
        const cart = await Cart.findOne({userId});

        if(cart) {
            throw ApiError.BadRequest('Корзина уже существует')
        }

        const cartProduct = await Cart.create({userId, products});
        return cartProduct.products 
    }
    
    async addProduct(productCart: ProductCartSchema, userId: Types.ObjectId) {
        const cart = await Cart.findOne({userId});

        if(!cart) {
            throw ApiError.BadRequest('Корзина не существует')
        } 

        const existingProduct = cart.products.find(item => item.productId.equals(productCart.productId));
     
        if (existingProduct) {
            throw ApiError.BadRequest('Этот товар уже добавлен')
        }
    
        cart.products.push(productCart);
        await cart.save();
    }

    async removeProduct(productId: Types.ObjectId, userId: Types.ObjectId) {
        const cart = await Cart.findOne({userId});

        if(!cart) {
            throw ApiError.BadRequest('Корзина не найдена')
        }

        const index = cart.products.findIndex(item => item.productId.equals(productId));

        if (index === -1) {
            throw ApiError.BadRequest('Товар не найден в корзине');
        }

        cart.products.splice(index, 1);
        await cart.save();
    }

    async getCartProducts(userId: Types.ObjectId) {
        const cart = await Cart.findOne({userId});

        if(!cart) {
            throw ApiError.BadRequest('Корзина не найдена')
        }

        return cart.products
    }
}

export default new CartService()