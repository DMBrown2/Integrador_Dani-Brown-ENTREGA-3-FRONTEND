import { Link } from 'react-router-dom';
import './Caracteristicas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faHandHoldingDollar, faTruckFast } from '@fortawesome/free-solid-svg-icons';

export default function Caracteristicas() {
  return (
    <>
     <section className="caracteristicas">
          <div className="caracteristica-1">
            <FontAwesomeIcon icon={faTruckFast} className="icono" />
            <p>Envios a todo el país</p>
          </div>
          <Link className="caracteristica-2" to="/contacto">
          <FontAwesomeIcon icon={faComments} className="icono" />         
            <p>Comunidad: club de lectura y envios especiales</p>
          </Link>
          <div className="caracteristica-3 icono">
            <FontAwesomeIcon icon={faHandHoldingDollar} className="icono" />
            <p>El mejor precio garantizado</p>
          </div>
        </section>
    </>
  )
}
