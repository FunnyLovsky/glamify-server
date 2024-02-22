import { Schema, model } from "mongoose";
import { ProductSchema } from "../types/IProduct";

const ProductSchema = new Schema<ProductSchema>({
    image: { type: String, required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    price: { type: Number, required: true },
    discount: { type: Number, default: null },
})

export default model('Product', ProductSchema);

