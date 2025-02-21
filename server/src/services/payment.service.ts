// src/services/payment.service.ts
import { stripeConfig } from '../config/stripe.config';

export const PaymentService = {
    async createPaymentIntent(orderId: string | null, amount: number) {
        try {
            const paymentIntent = await stripeConfig.paymentIntents.create({
                amount: Math.round(amount * 100), // Stripe usa centavos
                currency: 'usd', // Cambia según tu moneda
                metadata: orderId ? { orderId } : {}, // Solo incluye orderId si existe
            });
            return paymentIntent.client_secret;
        } catch (error) {
            console.error('Error creating PaymentIntent:', error);
            throw new Error('Failed to create payment intent');
        }
    },
};