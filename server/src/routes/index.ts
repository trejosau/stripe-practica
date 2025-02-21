import { Router } from 'express';
import adminRoutes from './admin.routes';
import clientRoutes from './client.routes';
import orderRoutes from './order.routes';
import orderProductRoutes from './orderProduct.routes';
import productRoutes from './product.routes';
import userRoutes from './user.routes';
import paymentRoutes from './payment.routes';

const router = Router();

// Definición de rutas base
router.use('/admins', adminRoutes);
router.use('/clients', clientRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/order-products', orderProductRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);

export default router;
