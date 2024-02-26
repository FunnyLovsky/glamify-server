import { Router } from "express";
import cartController from "../controllers/cartController";
import authMiddleware from "../middlewares/auth";

const router = Router();

router.post('/', authMiddleware, cartController.addProduct);
router.get('/', authMiddleware, cartController.getProducts);
router.delete('/', authMiddleware, cartController.deleteProduct);

export default router