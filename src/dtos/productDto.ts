import { ColorSchema, ProductDetailSchema, ProductSchema } from "../types/IProduct";

export default class ProductDto {
    name: string;
    image: string;
    rating: number;
    price: number;
    discount: number | null;
    url: string;
    category: string[];
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

        this.description = detail.description;
        this.sizes = detail.sizes;
        this.details = detail.details;
        this.colors = detail.colors;
    }
}