import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";  
import Navbar from "./components/Navbar"; 
import Catalogo from "./pages/Catalogo";
import ToastNotification from './components/ToastNotification'; // Importa el componente ToastNotification

const App = () => {
  return (
    <Router>
      <AppContent />
      <ToastNotification /> {/* Asegúrate de que el ToastContainer esté en algún lugar dentro de la aplicación */}
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {/* Solo muestra el Navbar si la ruta no es '/auth' */}
      {location.pathname !== "/auth" && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<LoginRegister />} />
        <Route path="/catalogo" element={<Catalogo />} />
      </Routes>
    </>
  );
};

export default App;
