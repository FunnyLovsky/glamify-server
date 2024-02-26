import { Document, Types } from "mongoose";

export interface ProductCartSchema extends Document {
    name: string;
    image: string;
    price: number;
    discount: number | null;
    size: string;
    color: string;
    count: number;
}

export interface CartSchema extends Document {
    userId: Types.ObjectId;
    products: ProductCartSchema[]
}

export interface ICart {
    userId: Types.ObjectId;
    products: ProductCartSchema[] | null;
}