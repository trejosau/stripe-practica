import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MisPedidos() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ordersPerPage = 2;

  const userID = localStorage.getItem('userID');

  useEffect(() => {
    if (!userID) {
      setError('Inicia sesion para acceder a esto');
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:6655/api/v1/orders/${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        setOrders(result.data); // Extraemos los pedidos desde 'data'
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userID]);

  // Paginación
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
              <p className="text-lg text-red-500">{error}</p>
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

        {/* Modal para detalles del pedido */}
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
                <p><strong>Fecha de Creación:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                <p><strong>Total:</strong> ${selectedOrder.total_amount}</p>
                <p><strong>Estado:</strong> {selectedOrder.payment_status}</p>

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