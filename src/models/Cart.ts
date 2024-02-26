import { Schema, model } from "mongoose";
import { CartSchema, ProductCartSchema } from "../types/ICart";

const ProductCartSchema = new Schema<ProductCartSchema>({
    color: {type: String, required: true},
    image: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: null },
    count: { type: Number, required: true}
})

const CartSchema = new Schema<CartSchema>({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    products: {type: [ProductCartSchema], required: true}
})

export default model('Cart', CartSchema);