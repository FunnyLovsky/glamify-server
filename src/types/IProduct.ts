import { Document } from "mongoose";

export interface ProductSchema extends Document {
    name: string,
    image: string;
    rating: number;
    price: number;
    discount: number | null;
    url: string;
    category: string[];
    style: string;
    salesCount: number;
    date: Date
}

export interface ProductDetailSchema extends Document {
    product: string,
    description: string;
    sizes: string[];
    details: [ string[] ];
    colors: ColorSchema[];
}

export interface ColorSchema extends Document {
    name: string;
    code: string;
    images: string[]; 
}

export interface ProductWithDetail {
    product: ProductSchema, 
    detail: ProductDetailSchema
}