import { Schema, model } from "mongoose";
import { ColorSchema, ProductDetailSchema, ProductSchema } from "../types/IProduct";


const colorSchema = new Schema<ColorSchema>({
    name: { type: String, required: true },
    code: { type: String, required: true },
    images: [{ type: String, required: true }]
});

const ProductDetailSchema = new Schema<ProductDetailSchema>({
    product: { type: String, required: true },
    description: { type: String, required: true },
    sizes: [{ type: String, required: true }],
    details: [{ type: [String] }],
    colors: { type: [colorSchema], required: true }
})

export default model('ProductDetail', ProductDetailSchema)