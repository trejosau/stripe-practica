import OrderProduct from '../models/OrderProduct.model';
import {OrderProductCreationAttributes} from "../types/models/OrderProduct";

export const OrderProductRepository = {
    async bulkCreate(orderProducts: OrderProductCreationAttributes[]) {
        try {
            return await OrderProduct.bulkCreate(orderProducts);
        } catch (error) {
            console.error('Error creating order products:', error);
            throw new Error('Error al agregar productos al pedido');
        }
    }
};
