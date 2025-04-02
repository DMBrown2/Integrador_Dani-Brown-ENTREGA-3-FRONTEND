import { useForm } from 'react-hook-form';
import './Contacto.css';
import Swal from "sweetalert2";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL

export default function Contacto() {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    console.log("Enviando datos a MockAPI:", data)
    
    try {
     await axios.post(`${URL}/users`, data);

      Swal.fire("¡Enviado!", "Tu mensaje fue registrado correctamente.", "success");
      
      reset();

    } catch (error) {
      console.log(error)
      Swal.fire("Error", "Hubo un problema al enviar el mensaje.", "error");
    }
  };

 
  return (
    <>
      <section className="section-contacto">
        <div className="titulo-form">
          <h1>Contactate con nosotros</h1>
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


              <div className="input-mensaje">
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
              </div>

              <div className="btn-contactar">
                <button 
                className="btn" 
                type="submit"
                disabled={!isValid}>
                  Enviar
                </button>
              </div>
            </div>
          </form>
          <div className="mapa-contacto">
            <iframe
              className="mapa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6570.197352305381!2d-58.41558026866533!3d-34.57636966616221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb579fe6a6dd5%3A0x38256ad937e5031d!2s3396%20Lafinur!5e0!3m2!1ses!2sar!4v1729781505576!5m2!1ses!2sar"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}
