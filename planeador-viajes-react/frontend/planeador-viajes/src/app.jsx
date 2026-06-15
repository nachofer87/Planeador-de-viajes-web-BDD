import { Router } from "preact-router";
import { useState } from "preact/hooks";

import Planeador from "./components/Planeador/Planeador";

import Inicio from "./pages/Inicio";
import Personas from "./pages/Personas";

function diasHastaInicio(fechaInicio) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const [y, m, d] = fechaInicio.split("-");
  const inicio = new Date(y, m - 1, d);
  return Math.ceil((inicio - hoy) / (1000 * 60 * 60 * 24));
}

export default function App() {
  const [viajes, setViajes] = useState([]);

  const recordatorios = viajes
    .map(v => ({ ...v, diasRestantes: diasHastaInicio(v.fechaInicio) }))
    .filter(v => v.diasRestantes >= 0 && v.diasRestantes <= 7);

  return (
    <>
      <Planeador recordatorios={recordatorios} />

      <Router>
        <Inicio path="/" viajes={viajes} setViajes={setViajes} />
        <Personas path="/personas" />
      </Router>
    </>
  );
}