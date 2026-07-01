import "./Planeador.css";

import logo    from "../../assets/logo.png";
import Usuario from "../Usuario/Usuario.jsx";

import { Link } from "preact-router/match";

export default function Planeador({ recordatorios = [] }) {
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
        
        <nav className="user">
          <Usuario/>
        </nav>
      </header>

      <div className="barra-superior">
          <div className="bar-sup-contenido">
            <span className="notif">
              {recordatorios.length === 1 ? "1 recordatorio:" : `${recordatorios.length} recordatorios:`}
            </span>
            {recordatorios.map(v => (
              <span key={v.nombre} className="notif">
                {v.diasRestantes === 0
                  ? `${v.nombre} parte hoy`
                  : v.diasRestantes === 1
                  ? `${v.nombre} parte mañana`
                  : `${v.nombre} parte en ${v.diasRestantes} días`}
              </span>
            ))}
          </div>
        </div>
    </>
  );
}