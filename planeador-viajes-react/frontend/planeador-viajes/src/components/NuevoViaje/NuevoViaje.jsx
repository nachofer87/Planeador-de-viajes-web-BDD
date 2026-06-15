import "./NuevoViaje.css";

import { useState, useEffect } from "preact/hooks";

import avion from "../../assets/avion.png";
import micro from "../../assets/micro.png";
import coche from "../../assets/coche.png";

function crearFechaLocal(fechaString) {
  const [year, month, day] = fechaString.split("-");

  return new Date(year, month - 1, day);
}

function calcularDiasRestantes(fechaInicio) {
  const hoy = new Date();
  const viaje = crearFechaLocal(fechaInicio);
  hoy.setHours(0, 0, 0, 0);
  viaje.setHours(0, 0, 0, 0);

  const diferencia = viaje.getTime() - hoy.getTime();
  const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    
  return `${dias} días`;
}

function formatearFechas(fechaInicio, fechaFin) {
  const inicio = crearFechaLocal(fechaInicio);
  const fin = crearFechaLocal(fechaFin);

  const mismoAnio = inicio.getFullYear() === fin.getFullYear();
  const opcionesSinAnio = { day: "numeric", month: "short" };
  const opcionesConAnio = { day: "numeric", month: "short", year: "numeric" };

  const strInicio = inicio.toLocaleDateString(
    "es-AR",
    mismoAnio ? opcionesSinAnio : opcionesConAnio
  );
  const strFin = fin.toLocaleDateString("es-AR", opcionesConAnio);

  return `${strInicio} - ${strFin}`;
}

function obtenerHoyISO() {
  return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
}

const iconos = { avion, micro, coche };

export default function NuevoViaje({
  abierto,
  cerrar,
  agregarViaje,
  viajeEditar,
  editarViaje,
  borrarViaje,
}) {
  const [nombre, setNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [tipo, setTipo] = useState("");

  const modoEdicion = viajeEditar != null;

  useEffect(() => {
    if (!abierto) return;
    if (modoEdicion) {
      setNombre(viajeEditar.nombre);
      setFechaInicio(viajeEditar.fechaInicio);
      setFechaFinal(viajeEditar.fechaFinal);
      setTipo(viajeEditar.tipo);
    } else {
      reset();
    }
  }, [abierto, viajeEditar]);

  if (!abierto) return null;

  const hoy = obtenerHoyISO();

  function reset() {
    setNombre("");
    setFechaInicio("");
    setFechaFinal("");
    setTipo("");
  }
  
  function cerrarYReset() {
    reset();
    cerrar();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!nombre.trim()) {
        alert("El destino no puede estar vacío.");
        return;
    }
    if (!fechaInicio || !fechaFinal) {
        alert("Las fechas no pueden estar vacías.");
        return;
    }
    if (!tipo) {
        alert("Debe seleccionar un medio de transporte.");
        return;
    }

    const viajeActualizado = {
      nombre,
      tipo,
      fechaInicio,
      fechaFinal,
      fechaFormateada: formatearFechas(fechaInicio, fechaFinal),
      dias: calcularDiasRestantes(fechaInicio),
      icono: iconos[tipo],
    };

    if (modoEdicion) {
      editarViaje(viajeActualizado);
    } else {
      agregarViaje(viajeActualizado);
    }

    reset();
    cerrar();
  }

  function handleBorrar() {
    borrarViaje();
    reset();
    cerrar();
  }

  return (
    <div className="overlay">
      <div className="formulario">
        <h2 className="formulario-titulo">
          {modoEdicion ? "Editar viaje" : "Nuevo viaje"}
        </h2>
        
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Destino"
            value={nombre}
            onInput={(e) => setNombre(e.target.value)}
          />

          <div className="fecha-grupo">
            <label className="fecha-label">Fecha de inicio:</label> <br/> 
            <input
              type="date"
              value={fechaInicio}
              min={hoy}
              onInput={(e) => setFechaInicio(e.target.value)}
            />
          </div>
          
          <div className="fecha-grupo">
            <label className="fecha-label">Fecha de finalización:</label> <br/>
            <input
              type="date"
              value={fechaFinal}
              min={fechaInicio || hoy}
              onInput={(e) => setFechaFinal(e.target.value)}
            />
          </div>
          
          <div><label className="tipo-label">Medio de transporte:</label> <br/>
          <select
            className={"menu-des"}
            value={tipo}
            onInput={(e) => setTipo(e.target.value)}
          >
            <option value="" disabled>Seleccionar...</option>
            <option value="avion">Avión</option>
            <option value="micro">Micro</option>
            <option value="coche">Coche</option>
          </select>
          </div>

          <div className="acciones-formulario">
            <button
              type="button"
              className="cancelar"
              onClick={cerrarYReset}
            >
              Cancelar
            </button>

            {modoEdicion && (
              <button
                type="button"
                className="eliminar"
                onClick={handleBorrar}
              >
                Eliminar
              </button>
            )}

            <button type="submit" className="crear">
              {modoEdicion ? "Guardar cambios" : "Crear viaje"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}