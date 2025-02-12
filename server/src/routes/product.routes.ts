import { Router } from 'express';
import { registerProduct, getProduct } from '../controllers/product.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateJWT(['admin']), registerProduct);
router.get('/:id', getProduct);

export default router;