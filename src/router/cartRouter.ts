import { Router } from "express";
import cartController from "../controllers/cartController";


const router = Router();

router.post('/', cartController.createCart)

export default router