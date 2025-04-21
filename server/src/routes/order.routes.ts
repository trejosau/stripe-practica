import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();
router.post('/',  OrderController.registerOrder);


router.get('/:userID', OrderController.getOrdersByUser);

export default router;