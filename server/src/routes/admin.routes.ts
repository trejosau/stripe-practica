import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';


const router = Router();

router.post('/register', authenticateJWT(['admin']), AdminController.registerAdmin);

export default router;