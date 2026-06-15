import "./Planeador.css";

import logo from "../../assets/logo.png";

import { Link } from "preact-router/match";

function textoRecordatorio(viaje) {
  if (viaje.diasRestantes === 0) return `${viaje.nombre} parte hoy`;
  if (viaje.diasRestantes === 1) return `${viaje.nombre} parte mañana`;
  return `${viaje.nombre} parte en ${viaje.diasRestantes} días`;
}

export default function Planeador({ recordatorios = [] }) {
  if (recordatorios.length === 0) return (
    <>
      <header className="header">
        <Link className="marca" href="/">
          <div className="logo">
            <img src={logo} alt="Logo Horizonte" width="54" height="54"/>
          </div>
          <div>
            <div className="marca-nombre"> Horizonte </div>
            <div className="marca-frase"> Planeador de viajes </div>
          </div>
        </Link>

        <nav className="enlaces">
          <Link activeClass="active" href="/" className="enlace">
            Inicio
          </Link>
          <Link activeClass="active" href="/personas" className="enlace">
            Personas
          </Link>
        </nav>
      </header>
    </>
  );

  return (
    <>
      <header className="header">
        <Link className="marca" href="/">
          <div className="logo">
            <img src={logo} alt="Logo Horizonte" width="54" height="54"/>
          </div>
          <div>
            <div className="marca-nombre"> Horizonte </div>
            <div className="marca-frase"> Planeador de viajes </div>
          </div>
        </Link>

        <nav className="enlaces">
          <Link activeClass="active" href="/" className="enlace">
            Inicio
          </Link>
          <Link activeClass="active" href="/personas" className="enlace">
            Personas
          </Link>
        </nav>
      </header>

      <div className="barra-superior">
        <div className="bar-sup-contenido">
          <span className="notif">
            {recordatorios.length === 1 ? "1 recordatorio: " : `${recordatorios.length} recordatorios: `}
          </span>
          {recordatorios.map(v => (
            <span key={v.nombre} className="notif">
              {textoRecordatorio(v) + ". "}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}