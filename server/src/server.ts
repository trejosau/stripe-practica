// src/server.ts
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

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        await sequelize.sync({ alter: true })
            .then(() => console.log('Tablas creadas o actualizadas correctamente'))
            .catch((error) => console.error('Error al crear las tablas:', error));

        // Configuración de Swagger (debe estar antes de las rutas)
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        // Rutas de la API (montadas en /api/v1 según app.ts)
        // Esto ya está manejado en app.ts con app.use('/api/v1', routes)

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
        });

    } catch (error) {
        console.error('Error en la conexión a la base de datos:', error);
    }
};

startServer();