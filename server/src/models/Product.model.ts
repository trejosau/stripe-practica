import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import { ProductAttributes, ProductCreationAttributes } from '../types/models/Product';

class Product extends Model<ProductAttributes, ProductCreationAttributes> {
    public id!: string;
    public name!: string;
    public description!: string;
    public photo!: string;
    public price!: number;
    public stock!: number;
}

Product.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'products',
        timestamps: false,
    }
);

export default Product;
