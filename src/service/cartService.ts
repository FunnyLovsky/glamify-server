import { Types } from 'mongoose'
import Cart from '../models/Cart'
import { ProductCartSchema } from '../types/ICart'
import ApiError from '../exceptions/api-error'
import Product from '../models/Product'

class CartService {
    async createCart(userId: Types.ObjectId, products: ProductCartSchema[] | null) {
        const cart = await Cart.findOne({ userId })

        if (cart) {
            throw ApiError.BadRequest('Корзина уже существует')
        }

        const cartProduct = await Cart.create({ userId, products })
        return await this.getDetailProducts(cartProduct.products)
    }

    async addProduct(productCart: ProductCartSchema, userId: Types.ObjectId) {
        const cart = await Cart.findOne({ userId })

        if (!cart) {
            throw ApiError.BadRequest('Корзина не существует')
        }

        const existingProduct = cart.products.find((item) =>
            item.productId.equals(productCart.productId)
        )

        if (existingProduct) {
            throw ApiError.BadRequest('Этот товар уже добавлен')
        }

        cart.products.push(productCart)
        await cart.save()
        return await this.getDetailProducts(cart.products)
    }

    async addProductList(productCart: ProductCartSchema[] | null, userId: Types.ObjectId) {
        const cart = await Cart.findOne({ userId })
        const addProducts: ProductCartSchema[] = []

        if (!cart) {
            throw ApiError.BadRequest('Корзина не существует')
        }

        if (!productCart) {
            return await this.getDetailProducts(cart.products)
        }

        for (const product of productCart) {
            const existingProduct = cart.products.find((item) =>
                item.productId.equals(product.productId)
            )

            if (!existingProduct) {
                addProducts.push(product)
            }
        }

        cart.products.push(...addProducts)
        await cart.save()
        return await this.getDetailProducts(cart.products)
    }

    async removeProduct(productId: Types.ObjectId, userId: Types.ObjectId) {
        const cart = await Cart.findOne({ userId })

        if (!cart) {
            throw ApiError.BadRequest('Корзина не найдена')
        }

        const index = cart.products.findIndex((item) => item.productId.equals(productId))

        if (index === -1) {
            throw ApiError.BadRequest('Товар не найден в корзине')
        }

        cart.products.splice(index, 1)
        await cart.save()
        return await this.getDetailProducts(cart.products)
    }

    async getCartProducts(userId: Types.ObjectId) {
        const cart = await Cart.findOne({ userId })

        if (!cart) {
            throw ApiError.BadRequest('Корзина не найдена')
        }
        return await this.getDetailProducts(cart.products)
    }

    async updateCartProducts(userId: Types.ObjectId, count: number, productId: Types.ObjectId) {
        const cart = await Cart.findOne({ userId })

        if (!cart) {
            throw ApiError.BadRequest('Корзина не найдена')
        }

        const productIndex = cart.products.findIndex((product) =>
            product.productId.equals(productId)
        )

        if (productIndex === -1) {
            throw ApiError.BadRequest('Продукт не найден в корзине')
        }

        cart.products[productIndex].count = count

        await cart.save()
        return await this.getDetailProducts(cart.products)
    }

    async removeAllProducts(userId: Types.ObjectId) {
        const cart = await Cart.findOne({ userId })

        if (!cart) {
            throw ApiError.BadRequest('Корзина не найдена')
        }

        cart.products = []

        await cart.save()
        return await this.getDetailProducts(cart.products)
    }

    async getDetailProducts(products: ProductCartSchema[]) {
        const productIds = products.map((product) => product.productId)

        const cartProducts = await Product.find(
            { _id: { $in: productIds } },
            { image: 1, name: 1, price: 1, discount: 1, url: 1 }
        )

        const productsWithDetails = products.map((product) => {
            const foundProduct = cartProducts.find((p) => p._id.equals(product.productId))
            return {
                id: foundProduct!._id,
                url: foundProduct!.url,
                image: foundProduct!.image,
                name: foundProduct!.name,
                price: foundProduct!.price,
                discount: foundProduct!.discount,
                color: product.color,
                size: product.size,
                count: product.count,
            }
        })

        return productsWithDetails
    }
}

export default new CartService()
