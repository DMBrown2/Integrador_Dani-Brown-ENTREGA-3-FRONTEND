import './Caracteristicas.css';

export default function Caracteristicas() {
  return (
    <>
     <section className="caracteristicas">
          <div className="caracteristica-1">
            <i className="fa-solid fa-truck-fast icono" />
            <p>Envios a todo el país</p>
          </div>
          <a className="caracteristica-2" href="/pages/suscripcion/suscripcion.html">
            <i className="fa-solid fa-comments icono" />
            <p>Comunidad: club de lectura y envios especiales</p>
          </a>
          <div className="caracteristica-3 icono">
            <i className="fa-solid fa-hand-holding-dollar icono" />
            <p>El mejor precio garantizado</p>
          </div>
        </section>
    </>
  )
}
