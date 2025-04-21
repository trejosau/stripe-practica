import { OrderRepository } from '../repositories/order.repository';
import { OrderProductRepository } from '../repositories/orderProduct.repository';
import { EventRepository } from '../repositories/event.repository';
import { OrderCreationAttributes } from '../types/models/Order';
import Order from '../models/Order.model';
import e from 'express';

export const OrderService = {
    async registerOrder(order: OrderCreationAttributes): Promise<Order> {
        const newOrder = await OrderRepository.create(order);
        if (!newOrder) {
            throw new Error('No se pudo crear el pedido');
        }
        return newOrder;
    },

    async addProductsToOrder(orderId: string, events: { event_id: string, quantity: number }[]): Promise<number> {
        let totalPrice = 0;
        const orderProducts: { order_id: string, event_id: string, quantity: number }[] = [];  // Cambié product_id a event_id
    
        for (const event of events) {
            const eventDetails = await EventRepository.findById(event.event_id);  // Cambié productDetails a eventDetails
            if (!eventDetails) {
                throw new Error(`El evento con ID ${event.event_id} no existe`);  // Cambié el nombre del error a evento
            }
            if (event.quantity < 1) {
                throw new Error('La cantidad de productos debe ser mayor o igual a 1');
            }
            if (event.quantity > eventDetails.stock) {
                throw new Error('La cantidad de productos no puede exceder el stock disponible');
            }
    
            const productTotalPrice = eventDetails.price * event.quantity;  // Cambié productDetails a eventDetails
            totalPrice += productTotalPrice;
    
            orderProducts.push({
                order_id: orderId,
                event_id: event.event_id,  // Cambié product_id a event_id
                quantity: event.quantity,
            });
        }
    
        await OrderProductRepository.bulkCreate(orderProducts);
        return totalPrice;
    },
    

    async updateOrderTotal(orderId: string, total: number): Promise<void> {
        await OrderRepository.updateTotal(orderId, total);
    },

    async getOrdersByUser(userId: string): Promise<Order[]> {
        try {
            return await Order.findAll({ where: { user_id: userId } });
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },
};
