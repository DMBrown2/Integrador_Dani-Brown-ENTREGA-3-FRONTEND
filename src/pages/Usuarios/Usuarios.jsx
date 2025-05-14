import { URL } from "../../config/env.config";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './Usuarios.css'



export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });



  const obtenerUsuarios = async () => {
    try {
      const { data } = await axios.get(`${URL}/users`);
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  // Agregar usuario (POST)
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("country", data.country);
      formData.append("role", data.role || "user");

      if (data.image?.length) {
        formData.append("image", data.image[0]);
      }
      // Enviar la solicitud POST
      await axios.post(`${URL}/users`, data);
      Swal.fire("¡Usuario agregado!", "El usuario ha sido registrado.", "success");
      reset(); // Limpiar formulario
      obtenerUsuarios(); // Refrescar la lista
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      Swal.fire("Error", "No se pudo agregar el usuario.", "error");
    }
  };


  // Eliminar usuario (DELETE)
  const eliminarUsuario = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar usuario?",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      customClass: {
        confirmButton: "swal-wide-button-confirm",
        cancelButton: "swal-wide-button-cancel",
      }
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${URL}/users/${id}`);
        obtenerUsuarios();

        Swal.fire("¡Eliminado!", "Usuario eliminado correctamente.", "success")


      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
      }
    }
  };

  return (
    <>
      <div className="usuarios-seccion">
        <h1 className="titu-usuarios">Usuarios Registrados</h1>

        <div className="contenido-usuarios">

          <div className="form-container">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group">
                <div className="input-nombre">
                  <label htmlFor="NOMBRE"> Nombre y Apellido:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nombre y Apellido"
                    pattern="^[a-zA-Z ]+$"
                    autoComplete="on"
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'Campo requerido',
                      },
                      maxLength: { value: 20, message: 'Max length is 20' },
                      minLength: { value: 3, message: 'Min length is 3' },
                    })}
                  />
                  {errors.name && <span>{errors.name.message}</span>}
                </div>


                <div className="input-email">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                    pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'Campo requerido',
                      },
                      maxLength: { value: 200, message: 'Max length is 200' },
                      minLength: { value: 3, message: 'Min length is 3' },
                    })}
                  />
                  {errors.email && <span>{errors.email.message}</span>}
                </div>

                <div className="input-password">
                  <label htmlFor="password">Contraseña:</label>
                  <input
                    type="password"
                    id="password"
                    {...register("password", {
                      required: "Campo requerido",
                      minLength: { value: 4, message: "Mínimo 4 caracteres" },
                    })}
                  />
                  {errors.password && <span>{errors.password.message}</span>}
                </div>

                <div className="input-country">
                  <label htmlFor="country">País:</label>
                  <input
                    type="text"
                    id="country"
                    {...register("country", {
                      required: "Campo requerido",
                      minLength: { value: 2, message: "Mínimo 2 caracteres" },
                    })}
                  />
                  {errors.country && <span>{errors.country.message}</span>}
                </div>

                <div className="input-message">
                  <label htmlFor="message">Mensaje:</label>
                  <textarea
                    type="text"
                    name="message"
                    id="message"
                    rows={5}
                    pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                    defaultValue={"  "}
                    {...register('message', {
                      required: {
                        value: true,
                        message: 'Campo requerido',
                      },
                      minLength: { value: 6, message: 'Debe tener al menos 6 caracteres' },
                      maxLength: { value: 150, message: 'Máximo 150 caracteres' },
                    })}
                  />
                  {errors.message && <span>{errors.message.message}</span>}
                </div>


                <div className="btn-contactar">
                  <button
                    className="btn"
                    type="submit"
                    disabled={!isValid}>
                    Agregar usuario
                  </button>
                </div>


              </div>
            </form>
          </div>


          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>País</th>
                  <th>Mensaje</th>
                  <th>Rol</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.country}</td>
                    <td>{user.message}</td>
                    <td>{user.role}</td>
                    <td>
                      {/* acciones como eliminar */}
                      <button onClick={() => eliminarUsuario(user._id)}><FontAwesomeIcon className="icon" icon={faTrash} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>


    </>
  );

}
