import { Types, Document } from 'mongoose'

export interface ProductSchema extends Document {
    name: string
    image: string
    rating: number
    price: number
    discount: number | null
    url: string
    category: string
    gender: string
    style: string
    salesCount: number
    date: Date
    colors: ColorSchema[]
    sizes: string[]
}

export interface ProductDetailSchema extends Document {
    productId: Types.ObjectId
    description: string
    details: [string[]]
}

export interface ColorSchema extends Document {
    name: string
    code: string
    images: string[]
}

export interface ProductWithDetail {
    product: ProductSchema
    detail: ProductDetailSchema
}
