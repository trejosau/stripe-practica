import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const Cart = ({ isCartOpen, toggleCart, cartItems }) => {
  return (
    <motion.div
      className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 z-50"
      initial={{ x: "100%" }}
      animate={{ x: isCartOpen ? 0 : "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      {/* Botón para cerrar la sidebar */}
      <button className="absolute top-4 right-4 text-gray-600" onClick={toggleCart}>
        <FaTimes className="h-6 w-6" />
      </button>

      <h2 className="text-xl font-bold mb-4">Carrito de Compras</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between border-b py-2">
              <img src={item.photo} alt={item.name} className="h-12 w-12 rounded-md" />
              <div className="flex-1 ml-2">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">${item.price} x {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default Cart;