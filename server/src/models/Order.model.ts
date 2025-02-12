import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import Client from './Client.model';
import { OrderAttributes, OrderCreationAttributes } from '../types/models/Order';

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: string;
    public client_id!: string;
    public total!: number;
    public status!: 'pending' | 'delivered' | 'canceled';
}

Order.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        client_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Client,
                key: 'id',
            },
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'cancelled'),
            allowNull: false,
            defaultValue: 'pending', // Estado por defecto
        },
    },
    {
        sequelize,
        tableName: 'orders',
        timestamps: true, // Si quieres manejar createdAt y updatedAt
    }
);

export default Order;
