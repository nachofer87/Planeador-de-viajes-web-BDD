import "./Planeador.css";

import logo from "../../assets/logo.png";

import { Link } from "preact-router/match";

export default function Planeador() {
  return (
    <>
      <header className="header">
        <div className="marca">
          <div className="logo">
            <img src={logo} alt="Logo Horizonte" width="54" height="54"/>
          </div>

          <div>
            <div className="marca-nombre"> Horizonte </div>
            <div className="marca-frase"> Planeador de viajes </div>
          </div>
        </div>

        <nav className="enlaces">
          <Link activeClass="enlace active" href="/" className="enlace">
            Inicio
          </Link>
          <Link activeClass="enlace active" href="/personas" className="enlace">
            Personas
          </Link>
        </nav>
      </header>

      <div className="barra-superior">
        <div className="bar-sup-contenido">
          <span className="notif"> 1 recordatorio/s: </span>

          <span className="notif"> París parte en 18 días </span>
        </div>
      </div>
    </>
  );
}