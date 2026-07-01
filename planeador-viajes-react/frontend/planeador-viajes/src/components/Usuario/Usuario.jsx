import "./Usuario.css";
import { useState, useEffect, useRef } from "preact/hooks";
import { createPortal } from "preact/compat";

import usuario from "../../assets/usuario.png";

const AUTH = "/api/usuario.php";

function FormLogin({ cerrar, onLogin }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setCargando(true);
    setError("");
    try {
      const res  = await fetch(`${AUTH}?accion=login`, {
        method:      "POST",
        headers:     { "Content-Type": "application/json" },
        credentials: "include",
        body:        JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        onLogin(data.usuario);
        cerrar();
      }
    } catch {
      setError("Error de conexión con el servidor.");
    }
    setCargando(false);
  }

  return (
    <>
      <h2 className="auth-titulo">Iniciar sesión</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-error">{error}</div>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onInput={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onInput={e => setPassword(e.target.value)}
          required
        />
        <div className="auth-acciones">
          <button type="button" className="auth-cancelar" onClick={cerrar}>
            Cancelar
          </button>
          <button type="submit" className="auth-submit" disabled={cargando}>
            {cargando ? "Cargando..." : "Iniciar sesión"}
          </button>
        </div>
      </form>
    </>
  );
}

function FormRegistro({ cerrar, onLogin }) {
  const [nombre,    setNombre]    = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error,     setError]     = useState("");
  const [cargando,  setCargando]  = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setCargando(true);
    setError("");
    try {
      const res  = await fetch(`${AUTH}?accion=registro`, {
        method:      "POST",
        headers:     { "Content-Type": "application/json" },
        credentials: "include",
        body:        JSON.stringify({ nombre, email, password }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        onLogin(data.usuario);
        cerrar();
      }
    } catch {
      setError("Error de conexión con el servidor.");
    }
    setCargando(false);
  }

  return (
    <>
      <h2 className="auth-titulo">Registrarse</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-error">{error}</div>}
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onInput={e => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onInput={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onInput={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmar}
          onInput={e => setConfirmar(e.target.value)}
          required
        />
        <div className="auth-acciones">
          <button type="button" className="auth-cancelar" onClick={cerrar}>
            Cancelar
          </button>
          <button type="submit" className="auth-submit" disabled={cargando}>
            {cargando ? "Cargando..." : "Registrarse"}
          </button>
        </div>
      </form>
    </>
  );
}

export default function Usuario() {
  const [menuAbierto,    setMenuAbierto]    = useState(false);
  const [modal,          setModal]          = useState(null);
  const [usuarioActual,  setUsuarioActual]  = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    fetch(`${AUTH}?accion=sesion`, { credentials: "include" })
      .then(r => r.json())
      .then(data => { if (data.usuario) setUsuarioActual(data.usuario); })
      .catch(() => {});
  }, []);

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

  function handleLogin(usuarioData) {
    setUsuarioActual(usuarioData);
  }

  async function handleLogout() {
    await fetch(`${AUTH}?accion=logout`, { method: "POST", credentials: "include" });
    setUsuarioActual(null);
    setMenuAbierto(false);
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
            {usuarioActual ? (
              <>
                <div className="usuario-menu-nombre">{usuarioActual.nombre}</div>
                <button className="usuario-menu-item" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <button className="usuario-menu-item" onClick={() => abrirModal("login")}>
                  Iniciar sesión
                </button>
                <button className="usuario-menu-item" onClick={() => abrirModal("registro")}>
                  Registrarse
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {modal && createPortal(
        <div className="auth-overlay" onClick={cerrarModal}>
          <div className="auth-card" onClick={e => e.stopPropagation()}>
            {modal === "login"
              ? <FormLogin    cerrar={cerrarModal} onLogin={handleLogin} />
              : <FormRegistro cerrar={cerrarModal} onLogin={handleLogin} />
            }
          </div>
        </div>,
        document.body
      )}
    </>
  );
}