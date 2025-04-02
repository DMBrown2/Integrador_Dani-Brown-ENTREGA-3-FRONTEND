import './Suscripcion.css'


export default  function Suscripcion() {
    return (
        <>
            <main>
                <div className="titulo-form">
                    <h1>Inscribite a la comunidad</h1>
                </div>
                <div className="form-container">
                    <form className="form">
                        <div className="input-group">
                            <div className="input-nombre">
                                <label htmlFor="NOMBRE"> Nombre y Apellido:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    id="NOMBRE"
                                    placeholder="Nombre y Apellido"
                                    required
                                    minLength={4}
                                    maxLength={120}
                                    pattern="^[a-zA-Z ]+$"
                                    autoComplete=""
                                />
                            </div>
                            <div className="input-email">
                                <label htmlFor="correo">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="correo"
                                    placeholder="email"
                                    required
                                    minLength={6}
                                    maxLength={150}
                                    pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                                />
                            </div>
                            <div className="input-password">
                                <label htmlFor="password">Contraseña:</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    minLength={8}
                                    maxLength={15}
                                />
                            </div>
                            <div className="input-password2">
                                <label htmlFor="password">Repetir contraseña:</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    minLength={8}
                                    maxLength={15}
                                />
                            </div>
                            <div className="input-edad">
                                <label htmlFor="edad">Edad:</label>
                                <input
                                    type="number"
                                    name="edad"
                                    id="edad"
                                    placeholder="Edad"
                                    required=""
                                    min={16}
                                    max={130}
                                />
                            </div>
                            <div className="input-nacimiento">
                                <label htmlFor="">Fecha Nacimiento:</label>
                                <input type="date" name="nacimiento" />
                            </div>
                            <div className="input-clasif">
                                <label htmlFor="clasif">Clasificación favorita:</label>
                                <input
                                    className="input-inline"
                                    id="clasif"
                                    type="checkbox"
                                    name="clasif"
                                    defaultValue="suspenso"
                                />{" "}
                                Suspenso
                                <input
                                    className="input-inline"
                                    id="clasif"
                                    type="checkbox"
                                    name="clasif"
                                    defaultValue="Romance"
                                />{" "}
                                Romance
                                <input
                                    className="input-inline"
                                    id="clasif"
                                    type="checkbox"
                                    name="clasif"
                                    defaultValue="Terros"
                                />{" "}
                                Terror
                                <input
                                    className="input-inline"
                                    id="clasif"
                                    type="checkbox"
                                    name="clasif"
                                    defaultValue="Misterio"
                                />{" "}
                                Misterio
                                <input
                                    className="input-inline"
                                    id="clasif"
                                    type="checkbox"
                                    name="clasif"
                                    defaultValue="Drama"
                                />{" "}
                                Drama
                            </div>
                            <div className="input-genero">
                                <label htmlFor="genero">Género:</label>
                                <input
                                    type="radio"
                                    className="input-inline"
                                    id="genero"
                                    name="genero"
                                    defaultValue="mujer"
                                />{" "}
                                Mujer
                                <input
                                    type="radio"
                                    className="input-inline"
                                    id="genero"
                                    name="genero"
                                    defaultValue="hombre"
                                />{" "}
                                Hombre
                                <input
                                    type="radio"
                                    className="input-inline"
                                    id="genero"
                                    name="genero"
                                    defaultValue="otro"
                                />{" "}
                                Otro
                            </div>
                            <div className="input-imagen">
                                <label htmlFor="image">Subí tu foto:</label>
                                <input type="file" id="image" name="image" accept="image/*" />
                            </div>
                        </div>
                        <div className="btn-registro">
                            <button className="btn" type="submit">
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}
