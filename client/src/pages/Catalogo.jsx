'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ModalProducto from '../components/ModalProducto';

const products = [
  { id: 1, name: 'Earthen Bottle', price: '$48', imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg', imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.' },
  { id: 2, name: 'Nomad Tumbler', price: '$35', imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg', imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.' },
  { id: 3, name: 'Focus Paper Refill', price: '$89', imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg', imageAlt: 'Person using a pen to cross a task off a productivity paper card.' },
  { id: 4, name: 'Machined Pencil', price: '$35', imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg', imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.' },
  { id: 5, name: 'Modern Chair', price: '$120', imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg', imageAlt: 'Modern ergonomic chair with a sleek design and leather upholstery.' },
  { id: 6, name: 'Wooden Desk', price: '$300', imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg', imageAlt: 'Stylish wooden desk with metal legs and a minimalist look.' },
  { id: 7, name: 'Ceramic Vase', price: '$50', imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg', imageAlt: 'Handcrafted ceramic vase with a smooth surface and elegant curves.' },
  { id: 8, name: 'Compact Lamp', price: '$40', imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg', imageAlt: 'Small desk lamp with adjustable arm and warm light.' },
];

export default function Catalog() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
                src={product.imageSrc}
                alt={product.imageAlt}
                className="w-full rounded-lg object-cover shadow-md group-hover:opacity-75"
                whileHover={{ scale: 1.05 }}
              />
              <h3 className="mt-4 text-lg font-medium text-gray-800">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
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
