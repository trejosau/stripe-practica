import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";  
import Navbar from "./components/Navbar"; 
import Catalogo from "./pages/Catalogo";
import ToastNotification from './components/ToastNotification'; // Importa el componente ToastNotification
import MisPedidos from "./pages/MisPedidos";
import Cancel from "./pages/Cancel";

const App = () => {
  return (
    <Router>
      <AppContent />
      <ToastNotification />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/auth" && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<LoginRegister />} />
        <Route path="/events" element={<Catalogo />} />
        <Route path="/pedidos" element={<MisPedidos />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </>
  );
};

export default App;
