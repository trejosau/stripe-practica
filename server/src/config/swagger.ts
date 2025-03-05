// src/config/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tienda de Gorras API con Stripe',
            version: '1.0.0',
            description: 'API para una tienda de gorras con integración de Stripe',
        },
        servers: [
            {
                url: 'http://localhost:6655',
                description: 'Servidor de desarrollo',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/controllers/*.ts', './src/routes/*.ts'], // Asegúrate de que estas rutas sean correctas
};

export const swaggerSpec = swaggerJSDoc(options);