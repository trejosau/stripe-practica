import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Endpoints para gestionar clientes
 */

const router = Router();

/**
 * @swagger
 * /api/v1/clients/register:
 *   post:
 *     summary: Registra un nuevo cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del cliente
 *               lastname:
 *                 type: string
 *                 description: Apellido del cliente
 *               username:
 *                 type: string
 *                 description: Correo electrónico del cliente
 *               password:
 *                 type: string
 *                 description: Contraseña del cliente
 *             required:
 *               - name
 *               - lastname
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Cliente registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del cliente registrado
 *                 name:
 *                   type: string
 *                   description: Nombre del cliente
 *                 lastname:
 *                   type: string
 *                   description: Apellido del cliente
 *                 username:
 *                   type: string
 *                   description: Correo electrónico del cliente
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 */
router.post('/register', ClientController.registerClient);

export default router;
