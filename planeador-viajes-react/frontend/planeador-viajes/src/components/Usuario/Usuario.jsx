import "./Usuario.css";
import { useState, useEffect, useRef } from "preact/hooks";

import usuario from "../../assets/usuario.png";

function FormLogin({ cerrar }) {
  return (
    <>
      <h2 className="auth-titulo">Iniciar sesión</h2>
      <form className="auth-form">
        <input type="email"    placeholder="Correo electrónico" />
        <input type="password" placeholder="Contraseña" />
        <div className="auth-acciones">
          <button type="button" className="auth-cancelar" onClick={cerrar}> Cancelar </button>
          <button type="submit" className="auth-submit"> Iniciar sesión </button>
        </div>
      </form>
    </>
  );
}

function FormRegistro({ cerrar }) {
  return (
    <>
      <h2 className="auth-titulo">Registrarse</h2>
      <form className="auth-form">
        <input type="text"     placeholder="Nombre completo" />
        <input type="email"    placeholder="Correo electrónico" />
        <input type="password" placeholder="Contraseña" />
        <input type="password" placeholder="Confirmar contraseña" />
        <div className="auth-acciones">
          <button type="button" className="auth-cancelar" onClick={cerrar}> Cancelar </button>
          <button type="submit" className="auth-submit"> Registrarse </button>
        </div>
      </form>
    </>
  );
}

export default function Usuario() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [modal,       setModal]       = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickFuera(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  function abrirModal(tipo) {
    setModal(tipo);
    setMenuAbierto(false);
  }

  function cerrarModal() {
    setModal(null);
  }

  return (
    <>
      <div className="usuario-wrapper" ref={wrapperRef}>
        <button
          className="usuario-btn"
          onClick={() => setMenuAbierto(v => !v)}
          aria-label="Menú de usuario"
        >
          <img src={usuario} alt="Usuario" width="70" height="44" />
        </button>

        {menuAbierto && (
          <div className="usuario-menu">
            <button className="usuario-menu-item" onClick={() => abrirModal("login")}> Iniciar sesión </button>
            <button className="usuario-menu-item" onClick={() => abrirModal("registro")}> Registrarse </button>
          </div>
        )}
      </div>

      {modal && (
        <div className="auth-overlay" onClick={cerrarModal}>
          <div className="auth-card" onClick={e => e.stopPropagation()}>
            {modal === "login"
              ? <FormLogin    cerrar={cerrarModal} />
              : <FormRegistro cerrar={cerrarModal} />
            }
          </div>
        </div>
      )}
    </>
  );
}