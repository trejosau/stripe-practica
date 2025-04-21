import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ModalProducto from '../components/ModalProducto';
import Carrito from '../components/Carrito';

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [filters, setFilters] = useState({
        location: '',
        minPrice: '',
        maxPrice: '',
        date: ''
    });

    useEffect(() => {
        fetch('http://localhost:6655/api/v1/events')
            .then((response) => response.json())
            .then((data) => {
                console.log('API Response:', data);
                setProducts(data.data || []);
                setFilteredProducts(data.data || []);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        // Apply filters
        let filtered = [...products];
        
        if (filters.location) {
            filtered = filtered.filter(product => 
                product.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        if (filters.minPrice) {
            filtered = filtered.filter(product => 
                product.price >= parseFloat(filters.minPrice)
            );
        }

        if (filters.maxPrice) {
            filtered = filtered.filter(product => 
                product.price <= parseFloat(filters.maxPrice)
            );
        }

        if (filters.date) {
            filtered = filtered.filter(product => 
                product.date === filters.date
            );
        }

        setFilteredProducts(filtered);
    }, [filters, products]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

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
        <div className="bg-black text-white pt-10 min-h-screen">
            <div className="mx-auto max-w-7xl px-8 py-16">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Eventos disponibles</h2>
                    <button
                        onClick={() => setCartOpen(true)}
                        className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
                    >
                        Ver Carrito ({cartItems.length})
                    </button>
                </div>

                {/* Filters Section */}
                <div className="mb-8 p-4 bg-gray-900 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Filtros</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            placeholder="Ubicación"
                            className="bg-gray-800 text-white p-2 rounded-md"
                        />
                        <input
                            type="number"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                            placeholder="Precio mínimo"
                            className="bg-gray-800 text-white p-2 rounded-md"
                        />
                        <input
                            type="number"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                            placeholder="Precio máximo"
                            className="bg-gray-800 text-white p-2 rounded-md"
                        />
                        <input
                            type="date"
                            name="date"
                            value={filters.date}
                            onChange={handleFilterChange}
                            className="bg-gray-800 text-white p-2 rounded-md"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
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
                            <h3 className="mt-4 text-lg font-medium">{product.name}</h3>
                            <p className="text-gray-400">${product.price}</p>
                            <p className="text-gray-400">Ubicación: {product.location}</p>
                            <p className="text-gray-400">Fecha: {product.date}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <ModalProducto
                product={selectedProduct}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                addToCart={addToCart}
            />

            <Carrito
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
                cartItems={cartItems}
                setCartItems={setCartItems}
            />
        </div>
    );
}