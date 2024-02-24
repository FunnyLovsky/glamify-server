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
            const name = req.query.name
            const gender = req.query.gender

     

            return res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}

export default new ProductController();