import Order from '../models/Order.model';
import { OrderCreationAttributes } from '../types/models/Order';
import OrderProduct from "../models/OrderProduct.model";
import Product from "../models/Product.model";

export class OrderRepository {

    static async create(order: OrderCreationAttributes) {
        try {
            return await Order.create(order);
        } catch (error) {
            console.error('Error creating order:', error);
            return null;
        }
    }

    async updatePaymentStatus(orderId: string, status: string, stripePaymentId: string) {
        return await Order.update(
            { payment_status: status, stripe_payment_id: stripePaymentId },
            { where: { id: orderId } }
        );
    }

    static async updateTotal(orderId: string, total: number) {
        try {
            const order = await Order.findByPk(orderId);
            if (!order) {
                throw new Error('No se pudo actualizar el total');
            }
            order.total = total;
            await order.save();
            return order;
        } catch (error) {
            console.error('Error updating order total:', error);
            return null;
        }
    }

    static async findById(orderId: string) {
        try {
            return await Order.findByPk(orderId);
        } catch (error) {
            console.error('Error fetching order:', error);
            return null;
        }
    }

    static async findAllByUserId(userId: string) {
        try {
            const orders = await Order.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: OrderProduct,
                        as: 'order_products',
                        include: [
                            {
                                model: Product,
                                as: 'product',
                            },
                        ],
                    },
                ],
            });
            return orders;
        } catch (error) {
            console.error('Error fetching orders from repository:', error);
            throw new Error('Database error while fetching orders');
        }
    }


}