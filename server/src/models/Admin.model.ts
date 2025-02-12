import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.config';
import User from './User.model';
import { AdminAttributes, AdminCreationAttributes } from '../types/models/Admin';

class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
    public id!: string;
    public user_id!: string;
}

Admin.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'admins',
        timestamps: false,
    }
);

export default Admin;