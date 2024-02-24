import ProductDto from "../dtos/productDto";
import ApiError from "../exceptions/api-error";
import Product from "../models/Product";
import ProductDetail from "../models/ProductDetail";
import { ProductWithDetail } from "../types/IProduct";
import transactionService from "./transactionService";

class ProductService {
    async createProduct(data: ProductWithDetail) {

        const { product, detail } = data;

        const existingProduct  = await Product.findOne({url: product.url});
            
        if(existingProduct ) {
            throw ApiError.Conflict('Такой товар уже существует!')
        }

        return await transactionService.withTransaction(async () => {

            const productData = await Product.create(product);
            await ProductDetail.create({...detail, product: productData.url});

            return { message: `Товар успешно создан`, product: productData.name};
        })
    }

    async getProduct(url: string) {

        const product = await Product.findOne({url});

        if(!product) {
            throw ApiError.BadRequest('Товар не найден')
        }

        const detail = await ProductDetail.findOne({product: url});

        return new ProductDto(product, detail!);
    }

    async findProducts(filters: any) {
        const products = await Product.find(filters)

        if(products.length === 0) {
            throw ApiError.NotFound('По данному запросы ничего не найдено')
        }

        return products
    }
}

export default new ProductService()