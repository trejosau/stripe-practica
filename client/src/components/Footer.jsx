'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-4">
        <motion.h2 
          className="text-3xl font-bold tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ¡Consigue tus boletos para eventos únicos en ticketmaistro!
        </motion.h2>
        <motion.p
          className="text-lg text-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          Vive la emoción en cada evento, ¡reserva tus lugares ahora y no te lo pierdas!
        </motion.p>
        <motion.p
          className="text-lg text-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          Compra boletos de forma segura y rápida en ticketmaistro.
        </motion.p>
        <motion.p
          className="text-sm text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          ¡La mejor experiencia para disfrutar de tus eventos favoritos!
        </motion.p>
      </div>
    </footer>
  );
}
