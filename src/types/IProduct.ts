import { Document } from "mongoose";

export interface ProductSchema extends Document {
    name: string,
    image: string;
    rating: number;
    price: number;
    discount: number | null;
}

export interface ProductDetailSchema extends Document {
    product: ProductSchema,
    description: string;
    sizes: string[];
    details: string;
    colors: ColorSchema[];
}

export interface ColorSchema extends Document {
    name: string;
    images: string[]; 
}

export interface ProductWithDetail {
    product: ProductSchema, 
    detail: ProductDetailSchema
}