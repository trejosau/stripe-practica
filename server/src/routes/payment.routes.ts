// src/routes/payment.routes.ts
import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Endpoints para gestionar pagos
 */

const router = Router();

/**
 * @swagger
 * /api/v1/payments/create-intent:
 *   post:
 *     summary: Crea un Payment Intent para procesar un pago
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Monto del pago en centavos (por ejemplo, 1000 para $10.00)
 *               currency:
 *                 type: string
 *                 description: Moneda del pago (por ejemplo, "usd")
 *             required:
 *               - amount
 *               - currency
 *     responses:
 *       201:
 *         description: Payment Intent creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *                   description: Clave secreta del Payment Intent
 *       400:
 *         description: Error en la solicitud
 */
router.post('/create-intent', PaymentController.createPaymentIntent);

export default router;
