import { Schema, model } from "mongoose";
import { ProductDetailSchema } from "../types/IProduct";


const ProductDetailSchema = new Schema<ProductDetailSchema>({
    productId: {type: Schema.Types.ObjectId, ref: 'Product'},
    description: { type: String, required: true },
    details: [{ type: [String] }],
})

export default model('ProductDetail', ProductDetailSchema)