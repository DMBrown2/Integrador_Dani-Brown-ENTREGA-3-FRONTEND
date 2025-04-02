import './Banner.css'
import libros from '../../assets/images/header/header.png' 

export default function Banner() {
  return (
    <>
    <section className="section-banner">
          <div className="slider">
            {/* Seccion de inputs para slider */}
            {/* input:radio#slide-$*3 // mismo nombre para que cuando clickee uno se desclickee el otro */}
            <input type="radio" name="slider" id="slide-1" />
            <input type="radio" name="slider" id="slide-2" />
            <input type="radio" name="slider" id="slide-3" />
            {/* Seccion de botones personalizados para slider (labels) */}
            <div className="slider-buttons">
              <label htmlFor="slide-1" />
              <label htmlFor="slide-2" />
              <label htmlFor="slide-3" />
            </div>
            {/* Seccion imagenes para slider  */}
            <div className="slider-content">
              <div className="slide slide-1">
                <img
                  src={libros}
                  className="varios-libros"
                />
              </div>
              <div className="slide slide-2">
                {" "}
                <img
                  src="https://images.ctfassets.net/qpn1gztbusu2/2E7qxF6c0Bw4f73XcvU1jd/a5a2fa17e8b710631baec056a23facd4/Mejores_libros_de_aventuras_para_ni_os_10_a_12_anos.webp?fm=jpg&w=3840&q=70"
                  alt="ilustra libro abierto"
                />
              </div>
              <div className="slide slide-3">
                <img
                  src="https://www.educaciontrespuntocero.com/wp-content/uploads/2022/10/webs-para-descargar-libros-gratis.jpg"
                  alt="dibujo pila de libros"
                />
              </div>
            </div>
          </div>
        </section>
        </>
  )
}
