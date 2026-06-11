import "./Tarjeta.css";

export default function Tarjeta({
  nombre,
  fecha,
  dias,
  icono,
  completado = false,
}) {
    return (
        <div className={`tarjeta-viaje ${completado ? "anterior" : ""}`}>
        <div className="contenido-viaje">
            <div className="icono-transporte">
                <img
                    src={icono}
                    alt={nombre}
                    height="24"
                    width="24"
                />
            </div>
            <div className="info-viaje">
                <div className="nombre-viaje"> {nombre} </div>
                <div className="fecha-viaje"> {fecha} </div>
            </div>

            { completado ?(
                <div className="completado"> Completado </div>
            ) : (
                <div className="dias-restantes"> {dias} </div>
            )}
        </div>
        </div>
    );
}