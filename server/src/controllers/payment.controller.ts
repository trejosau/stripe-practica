import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";

export class PaymentController {
    static async createPayment(req: Request, res: Response) {
        try {
            const { amount, currency } = req.body;
            const paymentIntent = await PaymentService.createPaymentIntent(amount, currency);
            res.json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            // @ts-ignore
            res.status(500).json({ error: error.message });
        }
    }
}
