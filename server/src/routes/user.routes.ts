import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gestionar usuarios
 */

const router = Router();

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     description: Permite que un usuario se autentique proporcionando su nombre de usuario y contraseña.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: El token JWT generado para el usuario
 *       400:
 *         description: Error en la solicitud, por ejemplo, campos faltantes o mal formateados
 *       401:
 *         description: Credenciales inválidas (nombre de usuario o contraseña incorrectos)
 *       500:
 *         description: Error en el servidor
 */

router.post('/login', UserController.loginUser);

export default router;
