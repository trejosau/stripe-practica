import React, { useState } from "react";
import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline';


const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const endpoint = isLogin ? "http://localhost:6655/api/v1/users/login" : "http://localhost:6655/api/v1/clients/register";
    const payload = isLogin ? { username, password } : { name, lastname, username, password };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });





            if (isLogin) {
                const responseData = await response.json();

                // Extraer datos correctamente
                const { user, token, rol } = responseData.data;

                console.log("Usuario:", user);
                console.log("Token:", token);
                console.log("Rol:", rol);

                // Guardar en localStorage
                localStorage.setItem("userID", user.id);
                localStorage.setItem("userName", user.username);
                localStorage.setItem("rol", rol);
                localStorage.setItem("token", token);

                console.log("Datos guardados en localStorage");

                setTimeout(() => {
                    console.log("Redirigiendo...");
                    window.location.href = "/";
                }, 2000);
            }
            else {
                console.log("Registro exitoso. Intentando iniciar sesión...");
                setIsLogin(true);
            }

        } catch (err) {
            console.error("Fetch Error:", err);
            setError(err.message || "Error al procesar la solicitud");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="bg-black text-white min-h-screen flex justify-center items-center">
            <div className="absolute inset-0 z-0">
            <Spline scene="https://prod.spline.design/2Nke-Y1kaZUyu5cH/scene.splinecode" />
            </div>

            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl flex relative overflow-hidden">
                <motion.div
                    className="flex w-full"
                    animate={{ x: isLogin ? "0%" : "-100%" }}
                    transition={{ duration: 0.5 }}
                    style={{ width: "200%" }}
                >
                    {/* Sección de Login */}
                    <div className="w-1/2 flex flex-col justify-center p-10 shrink-0">
                        <h2 className="text-3xl font-semibold text-center mb-6 text-black">Iniciar Sesión</h2>
                        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-700">Nombre de usuario</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-gray-100 rounded focus:ring-2 focus:ring-gray-500 text-black"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700">Contraseña</label>
                                <input
                                    type="password"
                                    className="w-full p-3 bg-gray-100 rounded focus:ring-2 focus:ring-gray-500 text-black"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full p-3 bg-black text-white rounded font-semibold transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
                            >
                                {loading ? "Ingresando..." : "Iniciar Sesión"}
                            </button>
                        </form>
                        <p className="text-center mt-4 text-black">
                            ¿No tienes cuenta? <span className="text-blue-400 cursor-pointer" onClick={() => setIsLogin(false)}>Regístrate</span>
                        </p>
                    </div>

                    {/* Imagen Login */}
                    <motion.div
                        className="w-1/2 flex justify-center items-center shrink-0 cursor-pointer"
                        animate={{ opacity: isLogin ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => window.location.href = '/'}
                    >
                        <img
                            src="https://d2rfa446ja7yzb.cloudfront.net/eyJidWNrZXQiOiJtaXJyb3IuZ2V0Zmxvd2JveC5jb20uZXUtd2VzdC0xLmxpdmUiLCJrZXkiOiJhSFIwY0hNNkx5OTNkM2N1YVc1emRHRm5jbUZ0TG1OdmJTOXdMMFJGWjBWelFXOXdTRkpSTHc9PS8wIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoxMDgwfX19"
                            alt="Login"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Imagen Registro */}
                    <motion.div
                        className="w-1/2 flex justify-center items-center shrink-0 cursor-pointer"
                        animate={{ opacity: isLogin ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => window.location.href = '/'}
                    >
                        <img
                            src="https://d2rfa446ja7yzb.cloudfront.net/eyJidWNrZXQiOiJtaXJyb3IuZ2V0Zmxvd2JveC5jb20uZXUtd2VzdC0xLmxpdmUiLCJrZXkiOiJhSFIwY0hNNkx5OTNkM2N1YVc1emRHRm5jbUZ0TG1OdmJTOXdMMFJEVm05Uk9GbFBXSGxKTHc9PS8yIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoxMDgwfX19"
                            alt="Register"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Sección de Registro */}
                    <div className="w-1/2 flex flex-col justify-center p-10 shrink-0">
                        <h2 className="text-3xl font-semibold text-center mb-6 text-black">Registrarse</h2>
                        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-700">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-3 bg-gray-100 rounded focus:ring-2 focus:ring-gray-500 text-black"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700">Apellido</label>
                                <input
                                    id="lastname"
                                    type="text"
                                    className="w-full p-3 bg-gray-100 rounded focus:ring-2 focus:ring-gray-500 text-black"
                                    value={lastname}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700">Nombre de usuario</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="w-full p-3 bg-gray-100 rounded focus:ring-2 focus:ring-gray-500 text-black"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full p-3 bg-gray-100 rounded focus:ring-2 focus:ring-gray-500 text-black"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full p-3 bg-black text-white rounded font-semibold transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
                            >
                                {loading ? "Registrando..." : "Registrarse"}
                            </button>
                        </form>
                        <p className="text-center mt-4 text-black">
                            ¿Ya tienes cuenta? <span className="text-blue-400 cursor-pointer" onClick={() => setIsLogin(true)}>Inicia sesión</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};


export default LoginRegister;
