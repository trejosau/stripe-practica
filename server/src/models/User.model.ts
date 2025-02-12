import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import { UserAttributes, UserCreationAttributes } from '../types/models/User';

class User extends Model<UserAttributes, UserCreationAttributes> {
    public id!: string;
    public username!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: false,
    }
);

export default User;
