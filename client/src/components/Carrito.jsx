// src/components/Carrito.jsx
import { XMarkIcon } from '@heroicons/react/20/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Carrito({ isOpen, onClose, cartItems, setCartItems }) {
    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
        toast.info('Producto removido del carrito');
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50" // Aumentamos el z-index para estar por encima del navbar
                >
                    {/* Fondo con blur */}
                    <div
                        className="fixed inset-0 bg-transparent"
                        style={{ backdropFilter: 'blur(8px)' }}
                        onClick={onClose}
                    />

                    {/* Contenedor del carrito con offset para el navbar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.3 }}
                        className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-full md:w-96 bg-white shadow-lg p-6" // top-16 = 4rem asume navbar de 64px
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Carrito</h2>
                            <button onClick={onClose}>
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {cartItems.length === 0 ? (
                            <p className="text-gray-500">El carrito está vacío</p>
                        ) : (
                            <>
                                <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <img
                                                src={item.photo}
                                                alt={item.name}
                                                className="w-16 h-16 rounded object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium">{item.name}</h3>
                                                <p className="text-gray-600">
                                                    ${item.price} x {item.quantity} = ${item.price * item.quantity}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <XMarkIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 border-t pt-4">
                                    <div className="flex justify-between text-lg font-medium">
                                        <span>Total:</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                    <button
                                        className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                    >
                                        Proceder al pago
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}