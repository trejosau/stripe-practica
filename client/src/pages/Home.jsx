'use client';
import "@fontsource/bebas-neue";  // Asegúrate de que esté importada
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom';  // Importa Link de react-router-dom

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-hidden">
      {/* Fondo Spline */}
      <div className="absolute inset-0 z-[-1]">
        <Spline scene="https://prod.spline.design/n8j1DD4BgxIr2Wlc/scene.splinecode" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <div className="flex-grow relative flex flex-col items-center justify-center text-center px-6 pt-24 lg:pt-32 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="text-white text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 drop-shadow-lg font-bebas uppercase"
        >
          GORRAS DE ESTILO ÚNICO
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-white text-lg text-gray-300 max-w-2xl uppercase"
        >
          DESCUBRE NUESTRAS GORRAS EXCLUSIVAS Y ENCUENTRA LA QUE MEJOR SE ADAPTE A TU ESTILO.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6"
        >
          <Link to="/catalogo" className="px-6 py-3 rounded-lg bg-white text-black font-semibold shadow-xl transition transform hover:scale-105">
            EXPLORAR CATÁLOGO
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer className="mt-auto" />
    </div>
  );
}
