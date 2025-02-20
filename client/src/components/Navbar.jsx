import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaShoppingBasket, FaChevronDown, FaUser } from 'react-icons/fa';

const navigation = ['Inicio', 'Catálogo'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    const storedCart = localStorage.getItem("cartItems");

    if (storedUser) {
      setUserName(storedUser);
      setIsLoggedIn(true);
    }

    if (storedCart) {
      setCartItems(parseInt(storedCart, 10));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName('');
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
      <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
        <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
          <motion.a
              href="/"
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
                    href={item === 'Inicio' ? '/' : '/catalogo'}
                    className="text-lg text-black hover:text-gray-600 transition"
                    whileHover={{ scale: 1.1 }}
                >
                  {item}
                </motion.a>
            ))}

            {/* Menú de usuario con dropdown */}
            <div className="relative">
              <button
                  className="text-lg text-black hover:text-gray-600 transition flex items-center space-x-2"
                  onClick={() => toggleDropdown('user')}
              >
                <FaUser className="h-6 w-6 text-black" />
                <span>{isLoggedIn ? userName : "Cuenta"}</span>
                <FaChevronDown className="h-5 w-5 text-black" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'user' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10"
                    >
                      {isLoggedIn ? (
                          <>
                            <p className="block px-4 py-2 text-lg font-semibold text-black">{userName}</p>
                            <motion.a
                                href="/pedidos"
                                className="block px-4 py-2 text-lg text-black hover:bg-gray-200 transition"
                            >
                              Mis pedidos
                            </motion.a>
                            <button
                                onClick={handleLogout}
                                className="block px-4 py-2 text-lg text-red-600 hover:bg-gray-200 transition w-full text-left"
                            >
                              Cerrar sesión
                            </button>
                          </>
                      ) : (
                          <>
                            <motion.a
                                href="/auth"
                                className="block px-4 py-2 text-lg text-black hover:bg-gray-200 transition"
                            >
                              Iniciar sesión
                            </motion.a>
                            <motion.a
                                href="/auth"
                                className="block px-4 py-2 text-lg text-black hover:bg-gray-200 transition"
                            >
                              Registrarse
                            </motion.a>
                          </>
                      )}
                    </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
      </header>
  );
}
