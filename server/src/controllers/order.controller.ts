// src/controllers/order.controller.ts
import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { formatResponse } from '../utils/responseFormatter';
import Order from '../models/Order.model'; // Importar el modelo para tipado

export const OrderController = {
    async registerOrder(req: Request, res: Response) {
        const { client_id, events } = req.body; // client_id viene del frontend

        try {
            console.log('Datos recibidos:', { client_id, events });

            // Validación básica
            if (!client_id || !events || !Array.isArray(events) || events.length === 0) {
                throw new Error('Datos incompletos: client_id y events son requeridos');
            }

            console.log('Registrando orden...');
            const newOrder: Order = await OrderService.registerOrder({
                user_id: client_id,      // Mapear client_id a user_id
                total_amount: 0,         // Valor inicial, se actualizará después
                payment_status: 'confirmed', // Pago ya confirmado por Stripe
                stripe_payment_id: null, // Opcional, puede ser null inicialmente
            });
            console.log('Orden registrada:', newOrder);

            console.log('Agregando productos...');
            const total = await OrderService.addProductsToOrder(newOrder.id, events);
            console.log('Total calculado:', total);

            if (total <= 0) {
                throw new Error('El total del pedido no puede ser 0 o negativo.');
            }

            console.log('Actualizando total...');
            await OrderService.updateOrderTotal(newOrder.id, total);
            console.log('Total actualizado');

            res.status(201).json(formatResponse('success', 'Pedido creado con éxito', { order: newOrder }));
        } catch (error) {
            console.error('Error en registerOrder:', error);
            res.status(400).json(formatResponse('error', 'Error al crear el pedido', error instanceof Error ? error.message : error));
        }
    },

    async getOrdersByUser(req: Request, res: Response) {
        try {
            const userId = req.params.userID;
            const orders = await OrderService.getOrdersByUser(userId);
            res.status(200).json(formatResponse('success', 'Ordenes recibidas', orders));
        } catch (error) {
            console.error('Error en getOrdersByUser:', error);
            res.status(400).json(formatResponse('error', 'Error al obtener las ordenes', error instanceof Error ? error.message : error));
        }
    },
};