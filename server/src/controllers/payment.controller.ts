// src/controllers/payment.controller.ts
import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';
import { formatResponse } from '../utils/responseFormatter';

export const PaymentController = {
    async createPaymentIntent(req: Request, res: Response) {
        try {
            const { amount } = req.body; // Recibe el total del frontend

            if (!amount || amount <= 0) {
                throw new Error('El monto debe ser mayor a 0');
            }

            const clientSecret = await PaymentService.createPaymentIntent(null, amount); // Sin orderId por ahora

            res.status(200).json(formatResponse('success', 'Payment Intent creado', { clientSecret }));
        } catch (error) {
            console.error('Error creando PaymentIntent:', error);
            // @ts-ignore
            res.status(400).json(formatResponse('error', 'Error al crear el Payment Intent', error.message));
        }
    },
};