import { Router } from "express";
import productController from "../controllers/productController";

const router = Router();

router.post('/products', productController.create);
router.get('/products/:productId', productController.getOneProduct);
router.get('/products', productController.getProductList);
router.delete('/products/:productId', productController.create)

export default router