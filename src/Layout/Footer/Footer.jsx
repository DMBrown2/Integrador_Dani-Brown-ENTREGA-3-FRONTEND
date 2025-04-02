import {faFaceAngry, faICursor } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Footer() {
  return (
<footer className="main-footer">
  <section className="footer-social">
    <div className="descripcion-social">
      Seguinos en nuestras redes y enterate todas las novedades:
    </div>
    <div className="iconos-social">
      <div className="icono-ig">
        <FontAwesomeIcon icon={faICursor} className="fa-brands fa-square-instagram icono" /> <p>@instagram</p>
      </div>
      <div className="icono-fb">
        <FontAwesomeIcon icon={faFaceAngry} className="fa-brands fa-square-facebook icono" /> <p>@facebook</p>
      </div>
    </div>
  </section>
  <section className="footer-contacto">
    <p className="titu-contacto">Contactanos</p>
    <div className="direccion">
      <i className="fa-solid fa-location-dot icono" />{" "}
      <p>Lafinur 3396, CABA.</p>
    </div>
    <div className="mail">
      <i className="fa-solid fa-envelope icono" />
      <p>hello@liberexpress.com</p>
    </div>
    <div className="telefono">
      <i className="fa-solid fa-phone-volume icono" />
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
