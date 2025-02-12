import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { formatResponse } from '../utils/responseFormatter';

export const OrderController = {
    async registerOrder(req: Request, res: Response) {
        const { client_id, products } = req.body;

        try {
            // Register the order
            const newOrder = await OrderService.registerOrder({
                client_id,
                total: 0,
                status: 'pending',
            });

            // Add products to the order
            await OrderService.addProductsToOrder(newOrder.id, products);

            // Respond with the created order
            res.status(201).json(formatResponse('success', 'Pedido creado con éxito', newOrder));
        } catch (error) {
            // Handle errors and respond with an error message
            res.status(400).json(formatResponse('error', 'Error al crear el pedido', error instanceof Error ? error.message : error));
        }
    }
};
