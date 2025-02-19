// src/components/ModalProducto.jsx
import { Dialog } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/20/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify'; // Solo importamos 'toast'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ModalProducto({ product, isOpen, onClose }) {
  if (!product) return null;

  // Función para manejar el botón "Agregar al carrito"
  const handleAddToCart = () => {
    toast.success('Producto agregado al carrito!', {
      position: 'top-right',  // Usamos el string directamente
      autoClose: 3000,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
          {/* Fondo con desenfoque (blur) sin color */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-transparent z-10"
            style={{
              backdropFilter: 'blur(8px)', // Aplica el desenfoque al fondo
            }}
          />

          {/* Contenido del modal */}
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="w-full md:w-1/2 rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                  <p className="text-xl text-gray-700">$ {product.price}</p>
                  <p className="text-gray-700">{product.stock} unidades en stock</p>

                  {/* Estrellas */}
                  <div className="mt-4 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          rating < 4 ? 'text-yellow-500' : 'text-gray-300',
                          'w-5 h-5'
                        )}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">(71 reviews)</span>
                  </div>

                  {/* Botón de compra */}
                  <button
                    onClick={handleAddToCart}
                    className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Agregar al carrito
                  </button>

                  {/* Botón para cerrar modal */}
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
