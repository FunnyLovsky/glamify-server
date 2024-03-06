import { NextFunction, Request, Response } from 'express'
import productService from '../service/productService'

class ProductController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req

            if (Array.isArray(body)) {
                const responseData = await Promise.all(
                    body.map((item) => productService.createProduct(item))
                )
                return res.status(200).json(responseData)
            } else {
                const data = await productService.createProduct(body)
                return res.status(200).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    async getOneProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const url = req.params.url

            const data = await productService.getProduct(url)

            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    async getProductList(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = productService.getFilters(req)
            const sort = productService.getSorts(req)
            const { products, totalCount } = await productService.findProducts(filters, sort, req)

            res.setHeader('X-Total-Count', totalCount.toString())

            return res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }
}

export default new ProductController()
