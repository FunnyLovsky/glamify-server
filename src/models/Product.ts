import { Schema, model } from "mongoose";
import { ProductSchema } from "../types/IProduct";

const ProductSchema = new Schema<ProductSchema>({
    image: { type: String, required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    price: { type: Number, required: true },
    discount: { type: Number, default: null },
    url: { type: String, required: true, unique: true},
    date: {type: Date, required: true},
    salesCount: { type: Number, required: true },
    style: { type: String, required: true },
    category: [{type: String, required: true}]
})

export default model('Product', ProductSchema);

