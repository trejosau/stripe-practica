import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', ClientController.registerClient);
export default router;
