import { Schema, model } from 'mongoose'
import { ColorSchema, ProductSchema } from '../types/IProduct'

const colorSchema = new Schema<ColorSchema>({
    name: { type: String, required: true },
    code: { type: String, required: true },
    images: [{ type: String, required: true }],
})

const ProductSchema = new Schema<ProductSchema>({
    image: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    price: { type: Number, required: true },
    discount: { type: Number, default: null },
    url: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    salesCount: { type: Number, required: true },
    style: { type: String, required: true },
    category: { type: String, required: true },
    gender: { type: String, required: true },
    colors: { type: [colorSchema], required: true },
    sizes: [{ type: String, required: true }],
})

export default model('Product', ProductSchema)
