import { Router } from "express";
import cartController from "../controllers/cartController";
import authMiddleware from "../middlewares/auth";

const router = Router();

router.post('/', authMiddleware, cartController.addProduct);
router.get('/', authMiddleware, cartController.getProducts);
router.delete('/:productId', authMiddleware, cartController.deleteProduct);
router.delete('/', authMiddleware, cartController.clearCart);
router.patch('/', authMiddleware, cartController.updateProducts)

export default router