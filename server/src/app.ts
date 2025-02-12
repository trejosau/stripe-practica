import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes/index';

const app: Application = express();

// Middlewares
app.use(cors());                 // Permitir solicitudes desde otros orígenes
app.use(express.json());         // Parsear JSON en el body de las peticiones
app.use(express.urlencoded({ extended: true })); // Parsear datos de formularios

// Rutas
app.use('/api/v1', routes);         // Prefijo para las rutas de la API

// Middleware para manejo de errores 404
app.use((_req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada.' });
});

export default app;
