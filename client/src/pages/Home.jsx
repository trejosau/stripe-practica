'use client';
import "@fontsource/bebas-neue";  
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom'; 
import concertVideo from '../assets/concert.mp4';

export default function Home() {
  const handleTimeUpdate = (e) => {
    const video = e.target;
    if (video.currentTime >= 5) { // Verifica si el video ha llegado a los 5 segundos
      video.currentTime = 0; // Reinicia el video a 0 segundos
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-hidden">
      <div className="absolute inset-0 z-[-1]">
        <video 
          className="w-full h-full object-cover" 
          src={concertVideo} 
          autoPlay 
          muted 
          loop
          onTimeUpdate={handleTimeUpdate} // Llama a la función para controlar la repetición
        />
      </div>

      <Navbar />

      <div className="flex-grow relative flex flex-col items-center justify-center text-center px-6 pt-24 lg:pt-32 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="text-white text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 drop-shadow-lg font-bebas uppercase"
        >
          VIVE LA MEJOR EXPERIENCIA
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6"
        >
          <Link to="/events" className="px-6 py-3 rounded-lg bg-white text-black font-semibold shadow-xl transition transform hover:scale-105">
            EXPLORAR EVENTOS
          </Link>
        </motion.div>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
}
