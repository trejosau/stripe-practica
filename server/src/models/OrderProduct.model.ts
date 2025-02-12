import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/db.config';
import Order from './Order.model';
import Product from './Product.model';
import { OrderProductAttributes, OrderProductCreationAttributes } from '../types/models/OrderProduct';

class OrderProduct extends Model<OrderProductAttributes, OrderProductCreationAttributes> implements OrderProductAttributes {
    public id!: string;
    public order_id!: string;
    public product_id!: string;
    public quantity!: number;
}

OrderProduct.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Order,
                key: 'id',
            },
        },
        product_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Product,
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'order_products',
        timestamps: false,
    }
);

export default OrderProduct;
