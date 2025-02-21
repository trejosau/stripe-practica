import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ModalProducto from '../components/ModalProducto';
import Carrito from '../components/Carrito';

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:6655/api/v1/products')
            .then((response) => response.json())
            .then((data) => {
                console.log('API Response:', data);
                setProducts(data.data || []);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    return (
        <div className="bg-white pt-10">
            <div className="mx-auto max-w-7xl px-8 py-16">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Catálogo</h2>
                    <button
                        onClick={() => setCartOpen(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                        Ver Carrito ({cartItems.length})
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            className="cursor-pointer group"
                            onClick={() => openModal(product)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.img
                                src={product.photo}
                                alt={product.name}
                                className="w-full rounded-lg object-cover shadow-md group-hover:opacity-75"
                                whileHover={{ scale: 1.05 }}
                            />
                            <h3 className="mt-4 text-lg font-medium text-gray-800">{product.name}</h3>
                            <p className="text-gray-600">${product.price}</p>
                            <p className="text-gray-600">Stock: {product.stock}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal de producto */}
            <ModalProducto
                product={selectedProduct}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                addToCart={addToCart}
            />

            {/* Carrito */}
            <Carrito
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
                cartItems={cartItems}
                setCartItems={setCartItems}
            />
        </div>
    );
}