import { XMarkIcon } from '@heroicons/react/20/solid';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
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
            Swal.fire({
                title: 'Error',
                text: 'Stripe no está cargado correctamente',
                icon: 'error',
                background: '#000',
                confirmButtonText: 'Aceptar',
                customClass: {
                    popup: 'text-white',
                    confirmButton: 'bg-red-600 text-white',
                }
            });
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        try {
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

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardNumberElement, // Usamos el elemento de número de tarjeta
                },
            });

            if (error) {
                Swal.fire({
                    title: 'Error en el pago',
                    text: error.message,
                    icon: 'error',
                    background: '#000',
                    customClass: {
                        popup: 'text-white',
                        confirmButton: 'bg-red-600 text-white',
                    }
                });
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                const products = cartItems.map((item) => ({
                    event_id: item.id,
                    quantity: item.quantity,
                }));

                const orderResponse = await fetch('http://localhost:6655/api/v1/orders/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        client_id: localStorage.getItem('userID') || '65ee461f-3ff5-4bad-8e8f-7abf0c25d4f2',
                        events: products,
                    }),
                });

                const orderData = await orderResponse.json();
                if (orderData.status === 'success') {
                    Swal.fire({
                        title: '¡Pago y orden creados con éxito!',
                        text: 'Tu pago y orden han sido procesados correctamente.',
                        icon: 'success',
                        background: '#000',
                        customClass: {
                            popup: 'text-white',
                            confirmButton: 'bg-green-600 text-white',
                        }
                    });
                    onSuccess();
                } else {
                    throw new Error(orderData.message || 'Error desconocido al crear la orden');
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                background: '#000',
                customClass: {
                    popup: 'text-white',
                    confirmButton: 'bg-red-600 text-white',
                }
            });
        }
    };

    const inputStyle = {
        style: {
            base: {
                color: 'white',
                backgroundColor: 'transparent',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aaa',
                },
            },
            invalid: {
                color: '#f56565',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Número de tarjeta</label>
                    <div className="mt-1 p-2 border border-white rounded-md bg-gray-800">
                        <CardNumberElement options={inputStyle} />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-300">Fecha de expiración</label>
                        <div className="mt-1 p-2 border border-white rounded-md bg-gray-800">
                            <CardExpiryElement options={inputStyle} />
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-300">CVC</label>
                        <div className="mt-1 p-2 border border-white rounded-md bg-gray-800">
                            <CardCvcElement options={inputStyle} />
                        </div>
                    </div>
                </div>
            </div>
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
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Este producto será eliminado del carrito',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            background: '#000',
            customClass: {
                popup: 'text-white',
                confirmButton: 'bg-red-600 text-white',
                cancelButton: 'bg-gray-600 text-white',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
                Swal.fire({
                    title: 'Producto removido',
                    text: 'El producto ha sido eliminado del carrito',
                    icon: 'info',
                    background: '#000',
                    customClass: {
                        popup: 'text-white',
                        confirmButton: 'bg-blue-600 text-white',
                    }
                });
            }
        });
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePayment = () => {
        Swal.fire({
            title: '¿Confirmas el pago?',
            text: `El total es $${total.toFixed(2)}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Pagar ahora',
            cancelButtonText: 'Cancelar',
            background: '#000',
            customClass: {
                popup: 'text-white',
                confirmButton: 'bg-green-600 text-white',
                cancelButton: 'bg-gray-600 text-white',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setShowCheckout(true);
            }
        });
    };

    const userId = localStorage.getItem('userID');
    if (!userId) {
        Swal.fire({
            title: 'Acceso denegado',
            text: 'Debes iniciar sesión para proceder con la compra.',
            icon: 'warning',
            background: '#000',
            confirmButtonText: 'Iniciar sesión',
            customClass: {
                popup: 'text-white',
                confirmButton: 'bg-blue-600 text-white',
            },
            preConfirm: () => {
                window.location.href = '/auth';
            }
        });
        return;
    }

    const handleSuccess = () => {
        setCartItems([]);
        setShowCheckout(false);
        onClose();

        Swal.fire({
            title: '¡Pago exitoso!',
            text: 'Tu pago ha sido procesado correctamente.',
            icon: 'success',
            confirmButtonText: 'Ver mis boletos',
            background: '#000',
            customClass: {
                popup: 'text-white',
                confirmButton: 'bg-green-600 text-white',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/pedidos';
            }
        });
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
                        className="fixed inset-0 bg-black opacity-50"
                        style={{ backdropFilter: 'blur(8px)' }}
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.3 }}
                        className="fixed right-0 top-0 h-full w-full md:w-96 bg-black text-white shadow-lg p-6"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Carrito</h2>
                            <button onClick={onClose}>
                                <XMarkIcon className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {cartItems.length === 0 ? (
                            <p className="text-gray-400">El carrito está vacío</p>
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
                                                <p className="text-gray-400">
                                                    ${item.price} x {item.quantity} = $
                                                    {item.price * item.quantity}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <XMarkIcon className="w-5 h-5 text-white" />
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