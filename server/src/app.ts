import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes/index';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/v1', routes);

app.use((_req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada.' });
});

export default app;
