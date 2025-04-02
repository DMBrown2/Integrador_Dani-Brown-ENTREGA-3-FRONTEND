import './Nosotros.css'


export default function Nosotros() {
    return (
        <>
            <section className="nosotros-container">
                <div className="header-nosotros">
                    <div className="imagen-libro">
                        <img
                            src="/assets/images/equipo/book-background-kjrczgc6vvrz6266.webp"
                            alt="libro abierto"
                        />
                    </div>
                    <div className="titulo-imagen-libro">
                        <p className="parte-1">
                            "Leer es viajar sin moverse, es abrir puertas a mundos infinitos. Es
                            expandir la mente con cada página y llenarla de ideas que
                        </p>
                        <p className="parte-2">iluminan el alma y transforman la vida."</p>
                    </div>
                </div>
                <div className="sobre-nosotros">
                    <div className="nosotros-info">
                        <h1 className="titulo-info">Sobre nosotros</h1>
                        <p>
                            Somos una empresa que empezó en el 2020 vendiendo y haciendo intercambio
                            de libros, y así se armó la comunidad. Creemos que el conocimiento es
                            poder y siempre tenemos en la mira que los libros sean algo sumamente
                            accesible.
                        </p>
                    </div>
                    <div className="nosotros-mision">
                        <h2 className="titulo-mision">Misión y valores</h2>
                        <div className="info-mision">
                            <div className="parrafo-mision">
                                <p>
                                    Nuestra misión es brindar cultura y conosimiento al mundo de manera
                                    accesible.
                                </p>
                                <p>
                                    Nuestros valores se construyen en torno a nuestra cominidad y a lo
                                    que ellos transmiten.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                                    quia magni ratione, impedit id quis iste dignissimos beatae maxime
                                    animi cumque perferendis cupiditate odio ut a ad repudiandae
                                    laboriosam quaerat.
                                </p>
                            </div>
                            <div className="img-mision">
                                <img
                                    src="https://img.freepik.com/foto-gratis/ilustracion-estilo-artistico-digital-concienciacion-sobre-dia-salud-mental_23-2151813260.jpg"
                                    alt="ilustración"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="equipo">
                    <div className="claim-equipo">
                        <h2 className="frase-1">
                            "Puedes diseñar, crear y construir el lugar más maravilloso del mundo.{" "}
                        </h2>
                        <h2 className="frase-2">
                            Pero se necesita gente para que el sueño se haga realidad."
                        </h2>
                    </div>
                    <h2 className="titulo-equipo">Nuestro equipo</h2>
                </div>
                <div className="card-equipo-container">
                    {/* ==========================
          CARD EQUIPO 1
          ========================= */}
                    <div className="card-equipo">
                        <div className="card-img">
                            {" "}
                            {/* IMAGEN + ICONOS SOCIAL */}
                            <div className="img">
                                <img src="/assets/images/equipo/pp.jpg.jfif" alt="" />
                            </div>
                            <div className="card-icon-container">
                                <div className="icon">
                                    <i className="fa-brands fa-square-instagram icono-ig" />
                                    <p className="handle-ig">@dani.brown</p>
                                </div>
                                <div className="icon">
                                    <i className="fa-brands fa-facebook icono-fb" />
                                    <p className="handle-fb">@dani.brown</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-info">
                            <div className="cargo">Founder</div>
                            <h3 className="titulo-imagen">Daniela Brown</h3>
                            <p className="info">
                                Licenciada en Comunicación Publicitaria. Trabajó más de 10 años en
                                agencias de publicidad, hasta que se dió cuenta que su verdadera
                                pasión es vender libros, acercar conocimiento y armar una comunidad en
                                torno a la cultura. Así nació <strong>Liber Express.</strong>
                            </p>
                        </div>
                    </div>
                    {/* ==========================
          CARD EQUIPO 2
          ========================= */}
                    <div className="card-equipo">
                        <div className="card-img">
                            {" "}
                            {/* IMAGEN + ICONOS SOCIAL */}
                            <div className="img">
                                <img src="....." alt="" />
                            </div>
                            <div className="card-icon-container">
                                <div className="icon">
                                    <i className="fa-brands fa-square-instagram icono-ig" />
                                    <p className="handle-ig">@vale.brown</p>
                                </div>
                                <div className="icon">
                                    <i className="fa-brands fa-facebook icono-fb" />
                                    <p className="handle-fb">@vale.brown</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-info">
                            <div className="cargo">CEO</div>
                            <h3 className="titulo-imagen">Valeria Brown</h3>
                            <p className="info">
                                Licenciada en Comunicación Publicitaria. Trabajó más de 10 años en
                                agencias de publicidad, hasta que se dió cuenta que su verdadera
                                pasión es vender libros, acercar conocimiento y armar una comunidad en
                                torno a la cultura. Así nació <strong>Liber Express.</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
