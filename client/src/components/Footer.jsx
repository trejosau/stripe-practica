'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-white text-black py-10 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-4">
        <motion.h2 
          className="text-3xl font-bold tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          GorraX
        </motion.h2>

        <nav className="flex space-x-8">
          {['Inicio', 'Catálogo', 'Personalizadas', 'Contacto'].map((item) => (
            <motion.a
              key={item}
              href="#"
              className="text-lg text-black hover:text-gray-600 transition"
              whileHover={{ scale: 1.1 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <p className="text-gray-600 text-sm">&copy; 2025 GorraX - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
