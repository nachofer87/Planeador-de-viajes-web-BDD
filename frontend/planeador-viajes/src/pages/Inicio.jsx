import Tarjeta   from "../components/Tarjetas/Tarjeta";
import NuevoViaje from "../components/NuevoViaje/NuevoViaje";

import { useState } from "preact/hooks";

function esPasado(fechaFinal) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const [y, m, d] = fechaFinal.split("-");
  return new Date(y, m - 1, d) < hoy;
}

export default function Inicio({ viajes, agregarViaje, editarViaje, borrarViaje }) {
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [viajeEditando,     setViajeEditando]     = useState(null);

  const proximosViajes   = viajes.filter(v => !esPasado(v.fechaFinal));
  const viajesAnteriores = viajes.filter(v =>  esPasado(v.fechaFinal));

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

  function handleEditar(viajeActualizado) {
    editarViaje(viajeActualizado, viajeEditando.id);
  }

  function handleBorrar() {
    borrarViaje(viajeEditando.id);
  }

  return (
    <main className="inicio">
      <section className="seccion-viajes">
        <h1 className="titulo-seccion">Próximos viajes</h1>

        <div className="grid-viajes">
          {proximosViajes.map((viaje) => (
            <Tarjeta
              key={viaje.id}
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
        editarViaje={handleEditar}
        borrarViaje={handleBorrar}
      />

      <div className="linea-divisora"></div>

      <section className="seccion-viajes">
        <h2 className="titulo-seccion">Viajes anteriores</h2>

        <div className="grid-viajes">
          {viajesAnteriores.map((viaje) => (
            <Tarjeta
              key={viaje.id}
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