import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import sequelize from './config/db.config';

// Importar modelos
import './models/Admin.model';
import './models/Client.model';
import './models/Order.model';
import './models/OrderProduct.model';
import './models/Product.model';
import './models/User.model';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        await sequelize.sync({ alter: true })
            .then(() => console.log('Tablas creadas o actualizadas correctamente'))
            .catch((error) => console.error('Error al crear las tablas:', error));

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error('Error en la conexión a la base de datos:', error);
    }
};

startServer();