import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MisPedidos() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null); // State for the selected order to show in modal
  const ordersPerPage = 2;
  const loading = false;
  const error = false;

  // Simulated API data based on your schema
  const orders = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: '2025-02-20 10:00:00',
      updatedAt: '2025-02-20 10:05:00',
      user_id: 'user-uuid-1',
      total_amount: 150.50,
      payment_status: 'pending',
      stripe_payment_id: 'pi_123456789',
      order_products: [
        { id: 'uuid-1', order_id: '123e4567-e89b-12d3-a456-426614174000', product_id: 'prod-uuid-1', quantity: 2 },
        { id: 'uuid-2', order_id: '123e4567-e89b-12d3-a456-426614174000', product_id: 'prod-uuid-2', quantity: 1 },
      ],
    },
    {
      id: '223e4567-e89b-12d3-a456-426614174001',
      createdAt: '2025-02-19 15:30:00',
      updatedAt: '2025-02-19 15:35:00',
      user_id: 'user-uuid-2',
      total_amount: 300.75,
      payment_status: 'confirmed',
      stripe_payment_id: 'pi_987654321',
      order_products: [
        { id: 'uuid-3', order_id: '223e4567-e89b-12d3-a456-426614174001', product_id: 'prod-uuid-3', quantity: 3 },
      ],
    },
  ];

  // Simulated products data
  const products = {
    'prod-uuid-1': { id: 'prod-uuid-1', name: 'Producto A', photo: 'url/to/photo1.jpg', price: 50.25, stock: 10 },
    'prod-uuid-2': { id: 'prod-uuid-2', name: 'Producto B', photo: 'url/to/photo2.jpg', price: 50.00, stock: 5 },
    'prod-uuid-3': { id: 'prod-uuid-3', name: 'Producto C', photo: 'url/to/photo3.jpg', price: 100.25, stock: 15 },
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
      <>
        <Navbar />
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto p-6 min-h-screen bg-white text-black flex flex-col items-center"
        >
          <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold mb-8 uppercase border-b-2 border-black pb-2"
          >
            Mis Pedidos
          </motion.h1>
          {loading ? (
              <p className="text-lg animate-pulse">Cargando pedidos...</p>
          ) : error ? (
              <p className="text-lg text-red-500">Error al cargar los pedidos.</p>
          ) : currentOrders.length === 0 ? (
              <p className="text-lg">No tienes pedidos aún.</p>
          ) : (
              <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="w-full max-w-2xl space-y-6"
              >
                {currentOrders.map((order, index) => (
                    <motion.li
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="p-6 border border-gray-300 rounded-lg shadow-md bg-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xl font-semibold">Pedido #{order.id.slice(0, 8)}</p>
                          <p className="text-gray-600">Total: ${order.total_amount}</p>
                          <p className="text-gray-600">Estado: {order.payment_status}</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
                            onClick={() => handleOpenModal(order)}
                        >
                          Ver detalles
                        </motion.button>
                      </div>
                    </motion.li>
                ))}
              </motion.ul>
          )}
          <div className="flex space-x-4 mt-6">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <button
                onClick={() => setCurrentPage((prev) => (indexOfLastOrder < orders.length ? prev + 1 : prev))}
                disabled={indexOfLastOrder >= orders.length}
                className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </motion.div>

        {/* Modal for Order Details */}
        {selectedOrder && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
              >
                <h2 className="text-2xl font-bold mb-4">Detalles del Pedido #{selectedOrder.id.slice(0, 8)}</h2>
                <p><strong>Fecha de Creación:</strong> {selectedOrder.createdAt}</p>
                <p><strong>Total:</strong> ${selectedOrder.total_amount}</p>
                <p><strong>Estado:</strong> {selectedOrder.payment_status}</p>
                <p><strong>ID de Pago Stripe:</strong> {selectedOrder.stripe_payment_id || 'No disponible'}</p>

                <h3 className="text-xl font-semibold mt-4">Productos</h3>
                <ul className="space-y-2 mt-2">
                  {selectedOrder.order_products.map((orderProduct) => {
                    const product = products[orderProduct.product_id];
                    return (
                        <li key={orderProduct.id} className="flex justify-between border-b py-2">
                          <div>
                            <p><strong>{product.name}</strong></p>
                            <p>Cantidad: {orderProduct.quantity}</p>
                          </div>
                          <p>${(product.price * orderProduct.quantity).toFixed(2)}</p>
                        </li>
                    );
                  })}
                </ul>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                    onClick={handleCloseModal}
                >
                  Cerrar
                </motion.button>
              </motion.div>
            </motion.div>
        )}

        <Footer />
      </>
  );
}