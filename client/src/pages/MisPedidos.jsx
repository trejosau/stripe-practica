import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MisPedidos() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 2;
  const loading = false;
  const error = false;

  const orders = [
    { id: 1, total: 100, status: 'Pendiente' },
    { id: 2, total: 200, status: 'Pendiente' },
    { id: 3, total: 300, status: 'Pendiente' },
    { id: 4, total: 400, status: 'Completado' },
  ];

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

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
                    <p className="text-xl font-semibold">Pedido #{order.id}</p>
                    <p className="text-gray-600">Total: ${order.total}</p>
                    <p className="text-gray-600">Estado: {order.status}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
                    onClick={() => navigate(`/pedido/${order.id}`)}
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
      <Footer />
    </>
  );
}
