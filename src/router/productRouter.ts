import { Router } from "express";
import productController from "../controllers/productController";

const router = Router();

// router.post('/', productController.create);
router.get('/:url', productController.getOneProduct);
router.get('/', productController.getProductList);

export default router