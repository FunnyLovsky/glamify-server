import { Router } from "express";
import userRouter from './userRouter';
import productRouter from './productRouter';

const router = Router()

router.use('/user', userRouter);
router.use('/', productRouter)

export default router;