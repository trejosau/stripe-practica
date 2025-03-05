import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints para gestionar órdenes
 */

const router = Router();

/**
 * @swagger
 * /api/v1/orders/:
 *   post:
 *     summary: Registra una nueva orden
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario que realiza la orden
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *             required:
 *               - userId
 *               - products
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 status:
 *                   type: string
 *       400:
 *         description: Error en la solicitud
 */
router.post('/',  OrderController.registerOrder);

/**
 * @swagger
 * /api/v1/orders/{userID}:
 *   get:
 *     summary: Obtiene las órdenes de un usuario específico
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de órdenes del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No se encontraron órdenes para el usuario
 */
router.get('/:userID', OrderController.getOrdersByUser);

export default router;