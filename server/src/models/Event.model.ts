import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import { EventAttributes, EventCreationAttributes } from '../types/models/Event';

class Event extends Model<EventAttributes, EventCreationAttributes> {
    public id!: string;
    public name!: string;
    public description!: string;
    public photo!: string;
    public price!: number;
    public stock!: number;
    public location!: string;
    public date!: Date;
}

Event.init(
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
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
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
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {  // ✔️ Ahora está correctamente definido
            type: DataTypes.DATE,
            allowNull: false,
        }
        
    },
    {
        sequelize,
        tableName: 'events',
        timestamps: false,
    }
);

export default Event;
