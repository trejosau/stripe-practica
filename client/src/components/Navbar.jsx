
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaShoppingBasket, FaChevronDown } from 'react-icons/fa'; // Importa el ícono de la cesta de compras

const navigation = ['Inicio', 'Catálogo'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
  const [userName, setUserName] = useState('Juan'); // Nombre de usuario simulado
  const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para controlar la apertura del dropdown
  const [cartItems, setCartItems] = useState(0); // Estado para manejar el número de productos en el carrito

  const addToCart = () => {
    setCartItems(cartItems + 1); // Función para agregar un producto al carrito
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <motion.a 
          href="/" // Enlace al Home
          className="text-3xl font-bold text-black tracking-widest"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          GorraX
        </motion.a>

        <div className="hidden lg:flex space-x-8">
          {navigation.map((item) => (
            <motion.a
              key={item}
              href={item === 'Inicio' ? '/' : '/catalogo'} // Enlace dinámico para 'Inicio' y 'Catálogo'
              className="text-lg text-black hover:text-gray-600 transition"
              whileHover={{ scale: 1.1 }}
            >
              {item}
            </motion.a>
          ))}

          {/* Mostrar el estado de autenticación */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4 relative">
              <span className="text-lg font-semibold">{userName}</span>
              <div className="relative">
                <FaShoppingBasket className="h-8 w-8 text-black" />
                {cartItems > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              {/* Dropdown para "Cuenta" */}
              <div className="relative">
                <button
                  className="text-lg text-black hover:text-gray-600 transition flex items-center space-x-2"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span>Cuenta</span>
                  <FaChevronDown className="h-5 w-5 text-black" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                    <motion.a
                      href="/auth" // Enlace a la página de Iniciar sesión
                      className="block px-4 py-2 text-lg text-black hover:bg-gray-200 transition"
                    >
                      Iniciar sesión
                    </motion.a>
                    <motion.a
                      href="/auth" // Enlace a la página de Registrarse
                      className="block px-4 py-2 text-lg text-black hover:bg-gray-200 transition"
                    >
                      Registrarse
                    </motion.a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Botón para el menú móvil */}
        <button 
          className="lg:hidden text-black" 
          onClick={() => setIsOpen(true)}
        >
          <FaBars className="h-8 w-8" />
        </button>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center space-y-6 text-black"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
          >
            {navigation.map((item) => (
              <motion.a
                key={item}
                href={item === 'Inicio' ? '/' : '/catalogo'} // Enlace dinámico para 'Inicio' y 'Catálogo'
                className="text-2xl font-semibold"
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </motion.a>
            ))}

            {/* Mostrar el estado de autenticación en el móvil */}
            {isLoggedIn ? (
              <div className="flex flex-col items-center">
                <span className="text-xl font-semibold">{userName}</span>
                <div className="relative">
                  <FaShoppingBasket className="h-8 w-8 text-black" />
                  {cartItems > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {/* Opciones de "Iniciar sesión" y "Registrarse" */}
                <motion.a
                  href="/auth" // Enlace a la página de Iniciar sesión
                  className="text-2xl font-semibold"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar sesión
                </motion.a>
                <motion.a
                  href="/auth" // Enlace a la página de Registrarse
                  className="text-2xl font-semibold"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  Registrarse
                </motion.a>
              </div>
            )}

            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-black"
            >
              <FaTimes className="h-8 w-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
