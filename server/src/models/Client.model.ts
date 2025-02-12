import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import User from "./User.model";
import { ClientAttributes, ClientCreationAttributes } from '../types/models/Client';

class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
    public id!: string;
    public user_id!: string;
    public name!: string;
    public lastname!: string;
}

Client.init(
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
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'clients',
        timestamps: false,
    }
);

export default Client;
