import { Router } from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middlewares/auth";
import validateMiddleware from "../middlewares/validate";

const router = Router()

router.post('/registration', validateMiddleware, userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.delete('/delete', authMiddleware, userController.deleteUser);
router.get('/auth', authMiddleware, userController.auth)

export default router;