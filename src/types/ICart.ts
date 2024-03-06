import { Document, Types } from 'mongoose'

export interface ProductCartSchema extends Document {
    productId: Types.ObjectId
    size: string
    color: string
    count: number
}

export interface CartSchema extends Document {
    userId: Types.ObjectId
    products: ProductCartSchema[]
}

export interface IProductCart {
    productId: string
    size: string
    color: string
    count: number
}
