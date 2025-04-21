// src/routes/payment.routes.ts
import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';


const router = Router();


router.post('/create-intent', PaymentController.createPaymentIntent);

export default router;
