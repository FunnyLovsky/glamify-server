import { ProductSchema } from "../types/IProduct";

export default class ProductDto {
    name: string;
    image: string;
    price: number;
    discount: number | null;
    url: string;
    rating: number;
   
    constructor(product: ProductSchema) {
        this.name = product.name;
        this.image = product.image;
        this.rating = product.rating;
        this.price = product.price;
        this.discount = product.discount;
        this.url = product.url;
    }
}