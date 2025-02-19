import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { PaymentService } from '../services/payment.service';
import { formatResponse } from '../utils/responseFormatter';

export const OrderController = {
    async registerOrder(req: Request, res: Response) {
        const { client_id, products } = req.body;

        try {
            // 1. Registrar la orden sin total aún
            const newOrder = await OrderService.registerOrder({
                client_id,
                total: 0,
                status: 'pending',
                payment_status: 'pending',
            });

            // 2. Agregar productos y calcular el total
            const total = await OrderService.addProductsToOrder(newOrder.id, products);

            // Verificar si `total` es válido antes de continuar
            if (total <= 0) {
                throw new Error('El total del pedido no puede ser 0 o negativo.');
            }

            // 3. Actualizar el total de la orden
            await OrderService.updateOrderTotal(newOrder.id, total);

            // 4. Crear el Payment Intent con el total actualizado
            const clientSecret = await PaymentService.createPaymentIntent(newOrder.id, total);

            // 5. Responder con la orden y el clientSecret de Stripe
            res.status(201).json(formatResponse('success', 'Pedido creado con éxito', { order: newOrder, clientSecret }));

        } catch (error) {
            console.error('Error en registerOrder:', error);

            res.status(400).json(formatResponse('error', 'Error al crear el pedido', error instanceof Error ? error.message : error));
        }
    }

};
