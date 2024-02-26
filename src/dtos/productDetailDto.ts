import { Types } from "mongoose";
import { ColorSchema, ProductDetailSchema, ProductSchema } from "../types/IProduct";

export default class ProductDetailDto {
    id: Types.ObjectId;
    name: string;
    image: string;
    rating: number;
    price: number;
    discount: number | null;
    category: string;
    gender: string;
    style: string;
    description: string;
    sizes: string[];
    details: [ string[] ];
    colors: ColorSchema[];
   
    constructor(product: ProductSchema, detail: ProductDetailSchema) {
        this.id = product._id;
        this.name = product.name;
        this.image = product.image;
        this.rating = product.rating;
        this.price = product.price;
        this.discount = product.discount;
        this.category = product.category;
        this.style = product.style;
        this.gender = product.gender;
        this.sizes = product.sizes;
        this.colors = product.colors;

        this.description = detail.description;
        this.details = detail.details;
    }
}