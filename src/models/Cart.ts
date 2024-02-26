import { Schema, model } from "mongoose";
import { CartSchema } from "../types/ICart";


const CartSchema = new Schema<CartSchema>({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    products: [
        {
            productId: {type: Schema.Types.ObjectId, ref: "Product"},
            color: {type: String, required: true},
            size: {type: String, required: true},
            count: { type: Number, required: true}
        }
    ]
})


export default model('Cart', CartSchema);