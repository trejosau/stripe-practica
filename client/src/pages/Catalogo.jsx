import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ModalProducto from '../components/ModalProducto';

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

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

    return (
        <div className="bg-white pt-10"> {/* Asegura que el contenido no quede oculto */}
            <div className="mx-auto max-w-7xl px-8 py-16">
                <h2 className="text-2xl font-bold mb-6">Catálogo</h2>

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
            />
        </div>
    );
}
