import { Router } from "express";
import productController from "../controllers/productController";

const router = Router();

router.post('/', productController.create);
router.get('/:productId', productController.getOneProduct);
router.get('/', productController.getProductList);
router.delete('/:productId', productController.create)

export default router