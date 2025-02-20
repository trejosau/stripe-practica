import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MisPedidos() {
  const navigate = useNavigate();
  const loading = false;
  const error = false;

  const orders = [
    {
      id: 1,
      total: 100,
      status: 'Pendiente',
    },
    {
      id: 2,
      total: 200,
      status: 'Pendiente',
    },
    {
      id: 3,
      total: 300,
      status: 'Pendiente',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 min-h-screen bg-white text-black flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 uppercase border-b-2 border-black pb-2">Mis Pedidos</h1>
        {loading ? (
          <p className="text-lg animate-pulse">Cargando pedidos...</p>
        ) : error ? (
          <p className="text-lg text-red-500">Error al cargar los pedidos.</p>
        ) : orders.length === 0 ? (
          <p className="text-lg">No tienes pedidos aún.</p>
        ) : (
          <ul className="w-full max-w-2xl space-y-6">
            {orders.map((order) => (
              <li key={order.id} className="p-6 border border-gray-300 rounded-lg shadow-md bg-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold">Pedido #{order.id}</p>
                    <p className="text-gray-600">Total: ${order.total}</p>
                    <p className="text-gray-600">Estado: {order.status}</p>
                  </div>
                  <button
                    className="px-5 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
                    onClick={() => navigate(`/pedido/${order.id}`)}
                  >
                    Ver detalles
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}