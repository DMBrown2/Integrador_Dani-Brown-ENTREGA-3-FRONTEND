import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

const URL = import.meta.env.VITE_API_URL

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
  });

  if (confirm.isConfirmed) {
    try {
      await axios.delete(`${URL}/users/${id}`);
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
    }
  }
};

  return (
    <div>
      <h1>Usuarios Registrados</h1>

      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => eliminarUsuario(user.id)}><FontAwesomeIcon icon={faTrash}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

<div className="form-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <div className="input-nombre">
                <label htmlFor="NOMBRE"> Nombre y Apellido:</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Nombre y Apellido"
                  pattern="^[a-zA-Z ]+$"
                  autoComplete="on"
                  {...register('nombre', {
                    required: {
                      value: true,
                      message: 'Campo requerido',
                    },
                    maxLength: { value: 20, message: 'Max length is 20' },
                    minLength: { value: 3, message: 'Min length is 3' },
                  })}
                />
                 {errors.nombre && <span>{errors.nombre.message}</span>}
              </div>


              <div className="input-email">
                <label htmlFor="correo">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                  autoComplete="on"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                    maxLength: { value: 20, message: 'Max length is 20' },
                    minLength: { value: 3, message: 'Min length is 3' },
                  })}
                />

              </div>


              {/* <div className="input-mensaje">
                <label htmlFor="mensaje">Mensaje:</label>
                <textarea
                  type="text"
                  name="mensaje"
                  id="mensaje"
                  rows={5}
                  pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                  defaultValue={"                    "}
                  {...register('mensaje', {
                    required: {
                      value: true,
                      message: 'Campo requerido',
                    },
                    minLength: { value: 6, message: 'Debe tener al menos 6 caracteres' },
                    maxLength: { value: 150, message: 'Máximo 150 caracteres' },
                  })}
                />
                {errors.mensaje && <span>{errors.mensaje.message}</span>}
              </div> */}

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
    </div>
  );
}
