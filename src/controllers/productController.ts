import { NextFunction, Request, Response } from "express";
import productService from "../service/productService";

class ProductController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            
            if (Array.isArray(body)) {
                const responseData = await Promise.all(body.map(item => productService.createProduct(item)));
                return res.status(200).json(responseData);
            } else {
                const data = await productService.createProduct(body);
                return res.status(200).json(data);
            }
        } catch (error) {
            next(error)
        }
    }

    async getOneProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.productId;

            const data = await productService.getProduct(productId);

            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    async getProductList(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, gender, category, style, price} = req.query
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
            if (style) {
                filters.style = style;
            }
            if(price) {
                const [min, max] = price.toString().split('-');
                filters.price = { $gte: parseInt(min), $lte: parseInt(max) }
            }
            
            const products = await productService.findProducts(filters)

            return res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }
}

export default new ProductController();