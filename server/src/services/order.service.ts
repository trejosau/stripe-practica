import { OrderRepository } from "../repositories/order.repository";
import { OrderProductRepository } from "../repositories/orderProduct.repository";
import { OrderCreationAttributes } from "../types/models/Order";
import { OrderProductCreationAttributes } from "../types/models/OrderProduct";
import {ProductRepository} from "../repositories/product.repository";
import Order from "../models/Order.model";

export const OrderService = {
    async getOrdersByUserId(userId: string): Promise<Order[]> {
        try {
            const orders = await OrderRepository.findAllByUserId(userId);
            if (!orders || orders.length === 0) {
                return [];
            }
            return orders;
        } catch (error) {
            console.error('Error in OrderService:', error);
            throw new Error('Failed to retrieve orders');
        }
    },

    async registerOrder(order: OrderCreationAttributes) {
        const newOrder = await OrderRepository.create({
            client_id: order.client_id,
            total: 0,
            status: 'pending',
            payment_status: 'pending',
        });

        if (!newOrder) {
            throw new Error('No se pudo crear el pedido');
        }

        return newOrder;
    },

    async updateOrderTotal(orderId: string, total: number) {
        await OrderRepository.updateTotal(orderId, total);
    },

    async addProductsToOrder(orderId: string, products: { product_id: string, quantity: number }[]) {
        let totalPrice = 0;  // Variable to hold the total price

        // Prepare the order products
        const orderProducts: OrderProductCreationAttributes[] = [];

        for (const product of products) {
            // Fetch product price from the product repository (assuming you have this method)
            const productDetails = await ProductRepository.findById(product.product_id);
            if (!productDetails) {
                throw new Error(`El producto con ID ${product.product_id} no existe`);
            }
            console.log('Product Details:', productDetails); // Verifica el precio aquí


            if (product.quantity < 1) {
                throw new Error('La cantidad de productos debe ser mayor o igual a 1');
            }

            if (product.quantity > productDetails.stock) {
                throw new Error('La cantidad de productos no puede exceder el stock disponible');
            }

            // Calculate price for this product based on quantity
            const productTotalPrice = productDetails.price * product.quantity;
            totalPrice += productTotalPrice;

            // Create order product entry
            orderProducts.push({
                order_id: orderId,
                product_id: product.product_id,
                quantity: product.quantity,
            });
        }

        // Insert order products into the database
        await OrderProductRepository.bulkCreate(orderProducts);

        await OrderRepository.updateTotal(orderId, totalPrice);

        return totalPrice; // Optionally return the total price
    }
};
