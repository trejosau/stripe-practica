import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';

class Order extends Model {
    public id!: string;
    public user_id!: string;
    public total_amount!: number;
    public payment_status!: 'pending' | 'confirmed' | 'failed';
    public stripe_payment_id!: string | null;
}

Order.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        total_amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        payment_status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'failed'),
            defaultValue: 'pending',
            allowNull: false,
        },
        stripe_payment_id: {
            type: DataTypes.STRING,
            allowNull: true, // Se llena cuando el pago se confirma
        },
    },
    {
        sequelize,
        tableName: 'orders',
        timestamps: true,
    }
);

export default Order;
