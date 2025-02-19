import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";

const router = Router();

router.post("/create-payment-intent", PaymentController.createPaymentIntent);
router.post("/confirm-payment", PaymentController.confirmPayment);

export default router;
