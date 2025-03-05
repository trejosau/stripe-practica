import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Endpoints para gestionar administradores
 *
 * /register:
 *   post:
 *     summary: Registra un nuevo administrador
 *     description: Crea un nuevo administrador en el sistema. Requiere autenticación JWT y rol de administrador.
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - username
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del administrador
 *               lastname:
 *                 type: string
 *                 description: Apellido del administrador
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del administrador
 *               password:
 *                 type: string
 *                 description: Contraseña del administrador
 *     responses:
 *       201:
 *         description: Administrador creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Administrador creado correctamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del administrador
 *                     user_id:
 *                       type: integer
 *                       description: ID del usuario asociado
 *       400:
 *         description: Error al crear el administrador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Faltan datos
 *                 data:
 *                   type: string
 *                   example: Error message
 */
const router = Router();

router.post('/register', authenticateJWT(['admin']), AdminController.registerAdmin);

export default router;