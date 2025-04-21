import React, { useState } from "react";
import { motion } from "framer-motion";

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [phone, setPhone] = useState(""); // Added phone state
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const endpoint = isLogin 
        ? "http://localhost:6655/api/v1/users/login" 
        : "http://localhost:6655/api/v1/clients/register";
    const payload = isLogin 
        ? { username, password, phone } 
        : { name, lastname, username, password, phone }; // Updated payload

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

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || "Error en la solicitud");
            }

            if (isLogin) {
                const { user, token, rol } = responseData.data;

                if (!user || !user.id) {
                    throw new Error("Respuesta del servidor inválida");
                }

                console.log("Usuario:", user);
                console.log("Token:", token);
                console.log("Rol:", rol);

                localStorage.setItem("userID", user.id);
                localStorage.setItem("userName", user.username);
                localStorage.setItem("rol", rol);
                localStorage.setItem("token", token);

                console.log("Datos guardados en localStorage");
                console.log("Redirigiendo...");
                window.location.href = "/";
            } else {
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
        <div className="bg-black text-white min-h-screen flex justify-center items-center relative overflow-hidden">
            {/* Animated background phrases */}
            <div className="absolute inset-0 flex flex-col justify-between items-start pointer-events-none">
                <motion.p
                    className="text-white text-xl opacity-40 whitespace-nowrap font-['Bebas_Neue']"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100vw" }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    ¡COMPRA TUS BOLETOS CON TICKETMAISTRO!
                </motion.p>
                <motion.p
                    className="text-white text-xl opacity-40 whitespace-nowrap font-['Bebas_Neue']"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100vw" }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    LOS MEJORES EVENTOS SOLO EN TICKETMAISTRO
                </motion.p>
                <motion.p
                    className="text-white text-xl opacity-40 whitespace-nowrap font-['Bebas_Neue']"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100vw" }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                    TICKETMAISTRO: TU ENTRADA AL ENTRETENIMIENTO
                </motion.p>
                <motion.p
                    className="text-white text-xl opacity-40 whitespace-nowrap font-['Bebas_Neue']"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100vw" }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                >
                    VIVE LA EXPERIENCIA CON TICKETMAISTRO
                </motion.p>
                <motion.p
                    className="text-white text-xl opacity-40 whitespace-nowrap font-['Bebas_Neue']"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100vw" }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                    TUS EVENTOS FAVORITOS CON TICKETMAISTRO
                </motion.p>
                <motion.p
                    className="text-white text-xl opacity-40 whitespace-nowrap font-['Bebas_Neue']"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100vw" }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                    TICKETMAISTRO TE LLEVA AL SHOW
                </motion.p>
                <motion.p
                    className="text-white text-xl opacity-40 whitespace-nowrap font-['Bebas_Neue']"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100vw" }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                >
                    ENTRADAS SEGURAS CON TICKETMAISTRO
                </motion.p>
                <motion.p
                    className="text-white text-xl opacity-40 whitespace-nowrap font-['Bebas_Neue']"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100vw" }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                    DISFRUTA SIN COMPLICACIONES CON TICKETMAISTRO
                </motion.p>
                <motion.p
                    className="text-white text-xl opacity-40 whitespace-nowrap font-['Bebas_Neue']"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100vw" }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                >
                    TICKETMAISTRO, TU COMPAÑERO DE EVENTOS
                </motion.p>
                <motion.p
                    className="text-white text-xl opacity-40 whitespace-nowrap font-['Bebas_Neue']"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100vw" }}
                    transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                >
                    LA MEJOR FORMA DE VIVIR EL MOMENTO
                </motion.p>
                <motion.p
                    className="text-white text-xl opacity-40 whitespace-nowrap font-['Bebas_Neue']"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100vw" }}
                    transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                >
                    TICKETMAISTRO: DONDE LOS SUEÑOS SE HACEN REALIDAD
                </motion.p>
                <motion.p
                    className="text-white text-xl opacity-40 whitespace-nowrap font-['Bebas_Neue']"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100vw" }}
                    transition={{ duration: 19, repeat: Infinity, ease: "linear" }}
                >
                    TU BOLETO, TU AVENTURA CON TICKETMAISTRO
                </motion.p>
                <motion.p
                    className="text-white text-xl opacity-40 whitespace-nowrap font-['Bebas_Neue']"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100vw" }}
                    transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
                >
                    EVENTOS INOLVIDABLES CON TICKETMAISTRO
                </motion.p>
            </div>

            {/* Main content with transparent card */}
            <div className="bg-transparent p-6 rounded-lg shadow-lg w-full max-w-3xl flex relative overflow-hidden">
                <motion.div
                    className="flex w-full"
                    animate={{ x: isLogin ? "0%" : "-100%" }}
                    transition={{ duration: 0.5 }}
                    style={{ width: "200%" }}
                >
                    {/* Login Section */}
                    <div className="w-1/2 flex flex-col justify-center p-6 shrink-0">
                        <h2 className="text-3xl font-semibold text-center mb-4 text-white">Iniciar sesión</h2>
                        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-sm text-gray-300">Nombre de usuario</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-700 rounded focus:ring-2 focus:ring-gray-500 text-white"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">Contraseña</label>
                                <input
                                    type="password"
                                    className="w-full p-2 bg-gray-700 rounded focus:ring-2 focus:ring-gray-500 text-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">Teléfono</label>
                                <input
                                    type="tel"
                                    className="w-full p-2 bg-gray-700 rounded focus:ring-2 focus:ring-gray-500 text-white"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    pattern="[0-9]{10}" // Basic validation for 10-digit phone
                                    title="Por favor ingrese un número de teléfono válido de 10 dígitos"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full p-2 bg-white text-black rounded font-semibold transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
                            >
                                {loading ? "Ingresando..." : "Iniciar sesión"}
                            </button>
                        </form>
                        <p className="text-center mt-3 text-white">
                            ¿No tienes cuenta? <span className="text-blue-400 cursor-pointer" onClick={() => setIsLogin(false)}>Regístrate</span>
                        </p>
                    </div>

                    {/* Login Image */}
                    <motion.div
                        className="w-1/2 flex justify-center items-center shrink-0 cursor-pointer"
                        animate={{ opacity: isLogin ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => window.location.href = '/'}
                    >
                        <img
                            src="https://assets.vogue.in/photos/678e2b456d22a01cc96f60f3/3:4/w_2560%2Cc_limit/Coldplay%2520Mumbai%25202024%2520-%252001.jpg"
                            alt="Login"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Register Section */}
                    <div className="w-1/2 flex flex-col justify-center p-6 shrink-0">
                        <h2 className="text-3xl font-semibold text-center mb-4 text-white">Registrarse</h2>
                        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-sm text-gray-300">Nombre</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-700 rounded focus:ring-2 focus:ring-gray-500 text-white"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">Apellido</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-700 rounded focus:ring-2 focus:ring-gray-500 text-white"
                                    value={lastname}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">Nombre de usuario</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-700 rounded focus:ring-2 focus:ring-gray-500 text-white"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">Contraseña</label>
                                <input
                                    type="password"
                                    className="w-full p-2 bg-gray-700 rounded focus:ring-2 focus:ring-gray-500 text-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">Teléfono</label>
                                <input
                                    type="tel"
                                    className="w-full p-2 bg-gray-700 rounded focus:ring-2 focus:ring-gray-500 text-white"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    pattern="[0-9]{10}"
                                    title="Por favor ingrese un número de teléfono válido de 10 dígitos"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full p-2 bg-white text-black rounded font-semibold transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
                            >
                                {loading ? "Registrando..." : "Registrarse"}
                            </button>
                        </form>
                        <p className="text-center mt-3 text-white">
                            ¿Ya tienes cuenta? <span className="text-blue-400 cursor-pointer" onClick={() => setIsLogin(true)}>Inicia sesión</span>
                        </p>
                    </div>

                    {/* Register Image */}
                    <motion.div
                        className="w-1/2 flex justify-center items-center shrink-0 cursor-pointer"
                        animate={{ opacity: isLogin ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src="https://static.wixstatic.com/media/a93123_f7bed86dbb584c6f8daa5150ae882a26~mv2.jpg/v1/fill/w_516,h_456,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/a93123_f7bed86dbb584c6f8daa5150ae882a26~mv2.jpg"
                            alt="Registro"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginRegister;