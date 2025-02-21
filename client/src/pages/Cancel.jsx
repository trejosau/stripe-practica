// Cancel.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaTimesCircle } from 'react-icons/fa';

const Cancel = () => {
  // Variantes de animación para el contenedor principal
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  // Variantes de animación para el botón
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 to-cyan-400 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="bg-white/95 rounded-2xl p-8 text-center max-w-md w-full shadow-2xl backdrop-blur-md">
        <motion.div
          className="mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 1 }}
        >
          <FaTimesCircle className="text-red-500 text-7xl mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-5 uppercase tracking-wide"
        >
          Pago Cancelado
        </motion.h1>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-600 text-lg mb-8 leading-relaxed"
        >
          Tu transacción ha sido cancelada exitosamente.
          ¿Deseas volver al inicio?
        </motion.p>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="bg-gradient-to-r from-red-400 to-red-300 text-white px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:from-red-300 hover:to-red-400 transition-colors"
          onClick={() => window.location.href = '/'}
        >
          Volver al Inicio
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Cancel;