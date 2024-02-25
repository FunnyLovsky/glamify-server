import { Request } from "express";
import ProductDetailDto from "../dtos/productDetailDto";
import ApiError from "../exceptions/api-error";
import Product from "../models/Product";
import ProductDetail from "../models/ProductDetail";
import { ProductSchema, ProductWithDetail } from "../types/IProduct";
import transactionService from "./transactionService";
import ProductDto from "../dtos/productDto";
import { Document, Types } from "mongoose";

class ProductService {
    async createProduct(data: ProductWithDetail) {

        const { product, detail } = data;

        const existingProduct  = await Product.findOne({url: product.url});
            
        if(existingProduct ) {
            throw ApiError.Conflict('Такой товар уже существует!')
        }

        return await transactionService.withTransaction(async () => {

            const productData = await Product.create(product);
            await ProductDetail.create({...detail, productId: productData._id});

            return { message: `Товар успешно создан`, product: productData.name};
        })
    }

    async getProduct(url: string) {

        const product = await Product.findOne({url});

        if(!product) {
            throw ApiError.BadRequest('Товар не найден')
        }

        const detail = await ProductDetail.findOne({product: url});

        return new ProductDetailDto(product, detail!);
    }

    async findProducts(filters: any = {}, sort: any = {}, req: Request) {
        const {limit, skip} = this.paginate(req);

        const totalCount = await Product.countDocuments(filters);
        const products = await Product.find(filters).sort(sort).skip(skip).limit(limit)

        if(products.length === 0) {
            throw ApiError.NotFound('По данному запросы ничего не найдено')
        }

        return {products: products.map(item => new ProductDto(item)), totalCount};
    }

    paginate(req: Request) {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 9;    

        const skip = (page - 1) * limit;

        return {skip, limit}
    }

    getFilters(req: Request) {
        const {name, gender, category, style, price, size, color} = req.query
        const filters: any = {};
        
        if (name) {
            filters.name = new RegExp(name.toString(), 'i');
        }

        if (gender) {
            filters.gender = gender  
        }

        if (category) {
            filters.category = category;
        }

        if (style && Array.isArray(style)) {
            filters.style = { $in: style };
        } else if (style) {
            filters.style = style;
        }

        if (size && Array.isArray(size)) {
            filters.sizes = { $in: size };
        } else if (size) {
            filters.sizes = size;
        }

        if (color && Array.isArray(color)) {
            filters.colors = {$elemMatch: { name: { $in: color }} };
        } else if (color) {
            filters.colors = {$elemMatch: { name: color} };
        }

        if(price) {
            const [min, max] = price.toString().split('-');
            filters.price = { $gte: parseInt(min), $lte: parseInt(max) }
        }

        return filters
    }

    getSorts(req: Request) {
        const {sortPrice, sortRating, sortDate, sortSales} = req.query
        const sorts: any = {};
        
        if(sortPrice) {
            sorts.price = +sortPrice;
        }

        if(sortRating) {
            sorts.rating = +sortRating;
        }

        if(sortDate) {
            sorts.date = +sortDate;
        }

        if(sortSales) {
            sorts.salesCount = +sortSales
        }

        return sorts
    }


}

export default new ProductService()