import micro from "../assets/micro.png";
import avion from "../assets/avion.png";
import coche from "../assets/coche.png";

import Tarjeta from "../components/Tarjetas/Tarjeta";

export default function Inicio() {
  const proximosViajes = [
    {
      nombre: "París",
      fecha: "12 - 20 dic 2026",
      dias: "18 días",
      icono: avion,
    },

    {
      nombre: "Bariloche",
      fecha: "5 - 12 ene 2027",
      dias: "42 días",
      icono: micro,
    },

    {
      nombre: "Costa Atlántica",
      fecha: "15 - 19 feb 2027",
      dias: "83 días",
      icono: coche,
    },
  ];

  const viajesAnteriores = [
    {
      nombre: "Roma",
      fecha: "10 - 17 oct 2023",
      icono: avion,
    },

    {
      nombre: "Nueva York",
      fecha: "2 - 9 ago 2023",
      icono: avion,
    },
  ];

  return (
    <main className="inicio">
      <section className="seccion-viajes">
        <h1 className="titulo-seccion">
          Próximos viajes
        </h1>

        <div className="grid-viajes">
          {
            proximosViajes.map((viaje) => (
              <Tarjeta
                nombre={viaje.nombre}
                fecha={viaje.fecha}
                dias={viaje.dias}
                icono={viaje.icono}
              />
            ))
          }

          <div className="nuevo-viaje">
            <div className="nuevo-icono">
              +
            </div>
          </div>
        </div>
      </section>

      <div className="linea-divisora"></div>

      <section className="seccion-viajes">
        <h2 className="titulo-seccion">
          Viajes anteriores
        </h2>

        <div className="grid-viajes">
          {
            viajesAnteriores.map((viaje) => (
              <Tarjeta
                nombre={viaje.nombre}
                fecha={viaje.fecha}
                icono={viaje.icono}
                completado={true}
              />
            ))
          }
        </div>
      </section>
    </main>
  );
}