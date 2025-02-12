import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: console.log, // Esto ayuda a ver las consultas que se están ejecutando
});

export default sequelize;
