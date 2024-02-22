import { NextFunction, Request, Response } from "express";
import { ProductWithDetail } from "../types/IProduct";
import Product from "../models/Product";
import ProductDetail from "../models/ProductDetail";

class ProductController {
    async create(reg: Request, res: Response, next: NextFunction) {
        try {
            const { product, detail } = reg.body as ProductWithDetail;
            const productData = await Product.create(product);
            const detailData = await ProductDetail.create({...detail, product: productData._id})

            return res.status(200).json({productData, detailData})
        } catch (error) {
            next(error)
        }
    }
}

export default new ProductController();