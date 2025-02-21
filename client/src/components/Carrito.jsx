import { XMarkIcon } from '@heroicons/react/20/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe('pk_test_51QmfI9CYYRBwU9rTbCwEKhIpQaw3vjZJK4DSk7r55P15MgsimIvPA8zWX8r3BSImmLpCzMRZVCBNfBMtGaF9iv2w00Hzq1bGDc');

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const CheckoutForm = ({ cartItems, total, onSuccess, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            toast.error('Stripe no está cargado correctamente');
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            // Paso 1: Obtener el clientSecret del PaymentIntent
            const intentResponse = await fetch('http://localhost:6655/api/v1/payments/create-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: total }),
            });

            if (!intentResponse.ok) {
                throw new Error(`Error en el servidor: ${intentResponse.statusText}`);
            }

            const intentData = await intentResponse.json();
            if (intentData.status !== 'success') {
                throw new Error(intentData.message);
            }

            const clientSecret = intentData.data.clientSecret;

            // Paso 2: Confirmar el pago con Stripe
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                toast.error(`Error en el pago: ${error.message}`);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                // Paso 3: Crear la orden en el backend tras el éxito del pago
                const products = cartItems.map((item) => ({
                    product_id: item.id,
                    quantity: item.quantity,
                }));
                console.log('Enviando al backend:', { client_id: localStorage.getItem('userId') || '123e4567-e89b-12d3-a456-426614174000', products }); // Depuración

                const orderResponse = await fetch('http://localhost:6655/api/v1/orders/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        client_id: localStorage.getItem('userID') || '65ee461f-3ff5-4bad-8e8f-7abf0c25d4f2',
                        products,
                    }),
                });

                const orderData = await orderResponse.json();
                if (orderData.status === 'success') {
                    toast.success('¡Pago y orden creados con éxito!');
                    onSuccess();
                } else {
                    throw new Error(orderData.message || 'Error desconocido al crear la orden');
                }
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="p-2 border rounded-md" />
            <button
                type="submit"
                disabled={!stripe}
                className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
                Pagar ahora
            </button>
        </form>
    );
};

export default function Carrito({ isOpen, onClose, cartItems, setCartItems }) {
    const [showCheckout, setShowCheckout] = useState(false);

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
        toast.info('Producto removido del carrito');
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePayment = () => {
        setShowCheckout(true); // Mostrar el formulario de Stripe
    };

    const handleSuccess = () => {
        setCartItems([]); // Limpia el carrito
        setShowCheckout(false); // Oculta el formulario
        onClose(); // Cierra el carrito
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50"
                >
                    <div
                        className="fixed inset-0 bg-transparent"
                        style={{ backdropFilter: 'blur(8px)' }}
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.3 }}
                        className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-full md:w-96 bg-white shadow-lg p-6"
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
                                                    ${item.price} x {item.quantity} = $
                                                    {item.price * item.quantity}
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

                                    {!showCheckout ? (
                                        <button
                                            onClick={handlePayment}
                                            className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                        >
                                            Proceder al pago
                                        </button>
                                    ) : (
                                        <Elements stripe={stripePromise}>
                                            <CheckoutForm
                                                cartItems={cartItems}
                                                total={total}
                                                onSuccess={handleSuccess}
                                                onClose={onClose}
                                            />
                                        </Elements>
                                    )}
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}