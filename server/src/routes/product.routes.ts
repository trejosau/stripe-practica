import { Router } from 'express';
import { registerProduct, getProduct, getProducts } from '../controllers/product.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para gestionar productos
 */

const router = Router();

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Registra un nuevo producto
 *     description: Permite registrar un nuevo producto en el sistema. Solo accesible para administradores.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *               price:
 *                 type: number
 *                 description: Precio del producto
 *               description:
 *                 type: string
 *                 description: Descripción del producto
 *               stock:
 *                 type: number
 *                 description: Cantidad en stock
 *             required:
 *               - name
 *               - price
 *               - stock
 *     responses:
 *       201:
 *         description: Producto registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del producto creado
 *       400:
 *         description: Error en la solicitud (campos inválidos o faltantes)
 *       401:
 *         description: No autorizado (solo administradores pueden registrar productos)
 *       500:
 *         description: Error en el servidor
 *
 *   get:
 *     summary: Obtiene todos los productos
 *     description: Recupera una lista de todos los productos disponibles.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del producto
 *                   name:
 *                     type: string
 *                     description: Nombre del producto
 *                   price:
 *                     type: number
 *                     description: Precio del producto
 *                   stock:
 *                     type: number
 *                     description: Cantidad en stock
 *       500:
 *         description: Error en el servidor
 *
 * /api/v1/products/{id}:
 *   get:
 *     summary: Obtiene un producto específico por su ID
 *     description: Recupera los detalles de un producto específico.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a recuperar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del producto
 *                 name:
 *                   type: string
 *                   description: Nombre del producto
 *                 price:
 *                   type: number
 *                   description: Precio del producto
 *                 stock:
 *                   type: number
 *                   description: Cantidad en stock
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */

router.post('/', authenticateJWT(['admin']), registerProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);

export default router;
