import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/db.config';
import Order from './Order.model';
import Event from './Event.model';
import { OrderProductAttributes, OrderProductCreationAttributes } from '../types/models/OrderProduct';

class OrderProduct extends Model<OrderProductAttributes, OrderProductCreationAttributes> implements OrderProductAttributes {
    public id!: string;
    public order_id!: string;
    public event_id!: string;  // Verifica que sea event_id y no product_id
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
        event_id: {  // Asegúrate de que el campo se llame event_id
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Event,
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