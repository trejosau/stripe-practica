import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';


const router = Router();

router.post('/', authenticateJWT(['client']), OrderController.registerOrder);

export default router;