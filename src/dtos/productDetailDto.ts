import { ColorSchema, ProductDetailSchema, ProductSchema } from "../types/IProduct";

export default class ProductDetailDto {
    name: string;
    image: string;
    rating: number;
    price: number;
    discount: number | null;
    url: string;
    category: string;
    gender: string;
    style: string;
    salesCount: number;
    date: Date;
    description: string;
    sizes: string[];
    details: [ string[] ];
    colors: ColorSchema[];
   
    constructor(product: ProductSchema, detail: ProductDetailSchema) {
        this.name = product.name;
        this.image = product.image;
        this.rating = product.rating;
        this.price = product.price;
        this.discount = product.discount;
        this.url = product.url;
        this.category = product.category;
        this.style = product.style;
        this.salesCount = product.salesCount;
        this.date = product.date;
        this.gender = product.gender;
        this.sizes = product.sizes;
        this.colors = product.colors;

        this.description = detail.description;
        this.details = detail.details;
    }
}