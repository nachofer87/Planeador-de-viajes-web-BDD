import avion from "../assets/avion.png";
import micro from "../assets/micro.png";
import coche from "../assets/coche.png";

export const iconos = { avion, micro, coche };

export function crearFechaLocal(fechaString) {
  const [y, m, d] = fechaString.split("-");
  return new Date(y, m - 1, d);
}

export function calcularDiasRestantes(fechaInicio) {
  const hoy = new Date();
  const viaje = crearFechaLocal(fechaInicio);
  hoy.setHours(0, 0, 0, 0);
  viaje.setHours(0, 0, 0, 0);
  const dif = viaje.getTime() - hoy.getTime();
  return `${Math.ceil(dif / (1000 * 60 * 60 * 24))} días`;
}

export function formatearFechas(fechaInicio, fechaFin) {
  const inicio = crearFechaLocal(fechaInicio);
  const fin    = crearFechaLocal(fechaFin);
  const mismoAnio    = inicio.getFullYear() === fin.getFullYear();
  const sinAnio      = { day: "numeric", month: "short" };
  const conAnio      = { day: "numeric", month: "short", year: "numeric" };
  const strInicio    = inicio.toLocaleDateString("es-AR", mismoAnio ? sinAnio : conAnio);
  const strFin       = fin.toLocaleDateString("es-AR", conAnio);
  return `${strInicio} - ${strFin}`;
}

export function mapearViaje(fila) {
  return {
    id:              Number(fila.id),
    nombre:          fila.nombre,
    tipo:            fila.tipo,
    fechaInicio:     fila.fecha_inicio,
    fechaFinal:      fila.fecha_final,
    fechaFormateada: formatearFechas(fila.fecha_inicio, fila.fecha_final),
    dias:            calcularDiasRestantes(fila.fecha_inicio),
    icono:           iconos[fila.tipo],
  };
}
