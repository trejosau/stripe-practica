import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';
import { formatResponse } from '../utils/responseFormatter';

export const PaymentController = {
    async createPaymentIntent(req: Request, res: Response) {
        const { order_id, amount } = req.body;

        try {
            const clientSecret = await PaymentService.createPaymentIntent(order_id, amount);
            res.status(200).json(formatResponse('success', 'Payment Intent creado', { clientSecret }));
        } catch (error) {
            res.status(400).json(formatResponse('error', 'Error al crear Payment Intent', error instanceof Error ? error.message : error));
        }
    },

    async confirmPayment(req: Request, res: Response) {
        const { order_id, stripe_payment_id } = req.body;

        try {
            await PaymentService.confirmPayment(order_id, stripe_payment_id);
            res.status(200).json(formatResponse('success', 'Pago confirmado'));
        } catch (error) {
            res.status(400).json(formatResponse('error', 'Error al confirmar pago', error instanceof Error ? error.message : error));
        }
    },
};
