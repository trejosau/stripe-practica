import { stripeConfig } from '../config/stripe.config';
import { OrderRepository } from '../repositories/order.repository';

const orderRepository = new OrderRepository(); // 🔹 Instanciamos el repositorio

export const PaymentService = {
    async createPaymentIntent(orderId: string, amount: number) {
        try {
            const paymentIntent = await stripeConfig.paymentIntents.create({
                amount: amount * 100, // Convertimos a centavos
                currency: 'usd',
                metadata: { orderId },
            });

            return paymentIntent.client_secret;
        } catch (error) {
            throw new Error('Error al crear Payment Intent');
        }
    },

    async confirmPayment(orderId: string, stripePaymentId: string) {
        try {
            await orderRepository.updatePaymentStatus(orderId, 'confirmed', stripePaymentId); // 🔹 Usamos la instancia
        } catch (error) {
            throw new Error('Error al confirmar el pago');
        }
    },
};
