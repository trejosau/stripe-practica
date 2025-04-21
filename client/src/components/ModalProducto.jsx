// src/components/ModalProducto.jsx
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ModalProducto({ product, isOpen, onClose, addToCart }) {
  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
  
    Swal.fire({
      icon: 'success',
      title: 'Boletos agregados al carrito!',
      text: `Los boletos para ${product.name} han sido agregados al carrito con éxito.`,
      confirmButtonText: 'Cerrar',
      background: '#000', // Fondo negro
      color: '#fff', // Texto blanco
      confirmButtonColor: '#4CAF50', // Color del botón de confirmación (puedes cambiarlo)
      customClass: {
        popup: 'popup-swal' // Para personalizar aún más el popup si es necesario
      }
    });
  };
  

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-transparent z-10"
            style={{
              backdropFilter: 'blur(8px)',
            }}
          />

          <div className="fixed inset-0 flex items-center justify-center z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-black text-white rounded-lg shadow-lg max-w-2xl w-full p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="w-full md:w-1/2 rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">{product.name}</h2>
                  <p className="text-xl text-gray-300">$ {product.price}</p>
                  <p className="text-gray-300">{product.stock} entradas disponibles</p>

                  <p className="mt-4 text-gray-200">{product.description}</p> {/* Descripción del producto */}

                  <button
                    onClick={handleAddToCart}
                    className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Agregar al carrito
                  </button>

                  <button
                    onClick={onClose}
                    className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
