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
}

export default new ProductService()