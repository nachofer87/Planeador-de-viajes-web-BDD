import micro from "../assets/micro.png";
import avion from "../assets/avion.png";
import coche from "../assets/coche.png";

import Tarjeta from "../components/Tarjetas/Tarjeta";
import NuevoViaje from "../components/NuevoViaje/NuevoViaje";

import { useState } from "preact/hooks";

function esPasado(fechaFinal) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const [y, m, d] = fechaFinal.split("-");
  const fin = new Date(y, m - 1, d);
  return fin < hoy;
}

export default function Inicio({ viajes, setViajes }) {
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [viajeEditando, setViajeEditando] = useState(null);

  const proximosViajes = viajes.filter(v => !esPasado(v.fechaFinal));
  const viajesAnteriores = viajes.filter(v => esPasado(v.fechaFinal));

  function abrirNuevo() {
    setViajeEditando(null);
    setFormularioAbierto(true);
  }

  function abrirEdicion(viaje) {
    setViajeEditando(viaje);
    setFormularioAbierto(true);
  }

  function cerrarModal() {
    setFormularioAbierto(false);
    setViajeEditando(null);
  }

  function agregarViaje(viajeNuevo) {
    setViajes(prev => [...prev, viajeNuevo]);
  }

  function editarViaje(viajeActualizado) {
    setViajes(prev => prev.map(v => v === viajeEditando ? viajeActualizado : v));
  }

  function borrarViaje() {
    setViajes(prev => prev.filter(v => v !== viajeEditando));
  }

  return (
    <main className="inicio">
      <section className="seccion-viajes">
        <h1 className="titulo-seccion">
          Próximos viajes
        </h1>

        <div className="grid-viajes">
          {proximosViajes.map((viaje) => (
            <Tarjeta
              key={viaje.nombre}
              nombre={viaje.nombre}
              fecha={viaje.fechaFormateada}
              dias={viaje.dias}
              icono={viaje.icono}
              onClick={() => abrirEdicion(viaje)}
            />
          ))}

          <div className="nuevo-viaje" onClick={abrirNuevo}>
            <div className="nuevo-icono">+</div>
          </div>
        </div>
      </section>

      <NuevoViaje
        abierto={formularioAbierto}
        cerrar={cerrarModal}
        agregarViaje={agregarViaje}
        viajeEditar={viajeEditando}
        editarViaje={editarViaje}
        borrarViaje={borrarViaje}
      />

      <div className="linea-divisora"></div>

      <section className="seccion-viajes">
        <h2 className="titulo-seccion">
          Viajes anteriores
        </h2>

        <div className="grid-viajes">
          {viajesAnteriores.map((viaje) => (
            <Tarjeta
              key={viaje.nombre}
              nombre={viaje.nombre}
              fecha={viaje.fechaFormateada}
              icono={viaje.icono}
              completado={true}
            />
          ))}
        </div>
      </section>
    </main>
  );
}