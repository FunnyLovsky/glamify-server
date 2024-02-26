import { Schema, model } from "mongoose";
import { CartSchema, ProductCartSchema } from "../types/ICart";

const ProductCartSchema = new Schema<ProductCartSchema>({
    productId: {type: Schema.Types.ObjectId, ref: "Product"},
    color: {type: String, required: true},
    size: {type: String, required: true},
    count: { type: Number, required: true}
})

const CartSchema = new Schema<CartSchema>({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    products:  [ProductCartSchema]
})

CartSchema.index({ 'products.productId': 1 }, { unique: false });

export default model('Cart', CartSchema);