import { Router } from "preact-router";
import { useState, useEffect } from "preact/hooks";

import Planeador from "./components/Planeador/Planeador";
import Inicio    from "./pages/Inicio";
import Personas  from "./pages/Personas";

import { mapearViaje } from "./components/Viajes.jsx";

const API = "/api/viajes.php";

function diasHastaInicio(fechaInicio) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const [y, m, d] = fechaInicio.split("-");
  const inicio = new Date(y, m - 1, d);
  return Math.ceil((inicio - hoy) / (1000 * 60 * 60 * 24));
}

export default function App() {
  const [viajes, setViajes] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => setViajes(data.map(mapearViaje)))
      .catch(err => console.error("Error al cargar viajes:", err));
  }, []);

  const recordatorios = viajes
    .map(v => ({ ...v, diasRestantes: diasHastaInicio(v.fechaInicio) }))
    .filter(v => v.diasRestantes >= 0 && v.diasRestantes <= 7);

  async function agregarViaje(viaje) {
    const res = await fetch(API, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre:      viaje.nombre,
        tipo:        viaje.tipo,
        fechaInicio: viaje.fechaInicio,
        fechaFinal:  viaje.fechaFinal,
      }),
    });
    const { id } = await res.json();
    setViajes(prev => [...prev, { ...viaje, id }]);
  }

  async function editarViaje(viaje, id) {
    await fetch(`${API}?id=${id}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre:      viaje.nombre,
        tipo:        viaje.tipo,
        fechaInicio: viaje.fechaInicio,
        fechaFinal:  viaje.fechaFinal,
      }),
    });
    setViajes(prev => prev.map(v => v.id === id ? { ...viaje, id } : v));
  }

  async function borrarViaje(id) {
    await fetch(`${API}?id=${id}`, { method: "DELETE" });
    setViajes(prev => prev.filter(v => v.id !== id));
  }

  return (
    <>
      <Planeador recordatorios={recordatorios} />

      <Router>
        <Inicio
          path="/"
          viajes={viajes}
          agregarViaje={agregarViaje}
          editarViaje={editarViaje}
          borrarViaje={borrarViaje}
        />
        <Personas path="/personas" />
      </Router>
    </>
  );
}