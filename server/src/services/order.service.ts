import { OrderRepository } from '../repositories/order.repository';
import { OrderProductRepository } from '../repositories/orderProduct.repository';
import { ProductRepository } from '../repositories/product.repository';
import { OrderCreationAttributes } from '../types/models/Order';
import Order from '../models/Order.model';

export const OrderService = {
    async registerOrder(order: OrderCreationAttributes): Promise<Order> {
        const newOrder = await OrderRepository.create(order);
        if (!newOrder) {
            throw new Error('No se pudo crear el pedido');
        }
        return newOrder;
    },

    async addProductsToOrder(orderId: string, products: { product_id: string, quantity: number }[]): Promise<number> {
        let totalPrice = 0;
        const orderProducts: { order_id: string, product_id: string, quantity: number }[] = [];

        for (const product of products) {
            const productDetails = await ProductRepository.findById(product.product_id);
            if (!productDetails) {
                throw new Error(`El producto con ID ${product.product_id} no existe`);
            }
            if (product.quantity < 1) {
                throw new Error('La cantidad de productos debe ser mayor o igual a 1');
            }
            if (product.quantity > productDetails.stock) {
                throw new Error('La cantidad de productos no puede exceder el stock disponible');
            }

            const productTotalPrice = productDetails.price * product.quantity;
            totalPrice += productTotalPrice;

            orderProducts.push({
                order_id: orderId,
                product_id: product.product_id,
                quantity: product.quantity,
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
