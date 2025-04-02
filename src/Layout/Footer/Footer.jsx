import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';


export default function Footer() {
  return (
<footer className="main-footer">
  <section className="footer-social">
    <div className="descripcion-social">
      Seguinos en nuestras redes y enterate todas las novedades:
    </div>
    <div className="iconos-social">
      <div className="icono-ig">
        <FontAwesomeIcon icon={faInstagram} className="icono" /> <p>@instagram</p>
      </div>
      <div className="icono-fb">
        <FontAwesomeIcon icon={faFacebook} className="icono" /> <p>@facebook</p>
      </div>
    </div>
  </section>
  <section className="footer-contacto">
    <p className="titu-contacto">Contactanos</p>
    <div className="direccion">
      <FontAwesomeIcon className='icono' icon={faLocationDot} />
      <p>Lafinur 3396, CABA.</p>
    </div>
    <div className="mail">
      <FontAwesomeIcon className='icono' icon={faEnvelope} />
      <p>hello@liberexpress.com</p>
    </div>
    <div className="telefono">
    <FontAwesomeIcon className='icono' icon={faPhone} />
      <p>(011) 1521864648</p>
    </div>
  </section>
  <section className="footer-info">
    <div className="info">
      <p>
        Somos una compañía sustentable que acerca libros y conocimiento a la
        gente de manera accesible.
      </p>
    </div>
    <div className="contenedor-logo">
      <img
        className="logo"
        src="https://liberexpress.es/wp-content/uploads/2021/07/liberexpress-logo.svg"
        alt="LOGO"
      />
    </div>
  </section>
</footer>

  )
}
