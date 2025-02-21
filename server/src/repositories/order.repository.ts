// src/repositories/order.repository.ts
import Order from '../models/Order.model';
import { OrderCreationAttributes } from '../types/models/Order';

export class OrderRepository {
    static async create(order: OrderCreationAttributes): Promise<Order> {
        try {
            return await Order.create(order);
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }

    static async updateTotal(orderId: string, total: number): Promise<Order> {
        try {
            const order = await Order.findByPk(orderId);
            if (!order) {
                throw new Error('No se pudo encontrar la orden para actualizar el total');
            }
            order.total_amount = total; // Actualizar total_amount en lugar de total
            await order.save();
            return order;
        } catch (error) {
            console.error('Error updating order total:', error);
            throw error;
        }
    }

    static async findById(orderId: string): Promise<Order | null> {
        try {
            return await Order.findByPk(orderId);
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error;
        }
    }
}