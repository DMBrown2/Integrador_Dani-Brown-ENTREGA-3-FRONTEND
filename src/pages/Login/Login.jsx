import { useForm } from 'react-hook-form';
import './Login.css';
import { useUser } from '../../context/UserContext';

// const URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useUser();



  return (
    <section className="login">
      <div className="login-container">

        <form className="admin-form" onSubmit={handleSubmit(login)}>

         <h1>Iniciar sesión</h1>

          <div className="input-group">
            <label htmlFor="">Email</label>
            <input type="email" {...register("email", {
              required: 'Email es requerido',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Dirección de correo electrónico no válida',
              },
            })} placeholder="Ingresá tu email" />
            {errors.email && <p className="input-error">{errors.email.message}</p>}
          </div>



          <div className="input-group">
            <label htmlFor="">Password</label>
            <input  type="password"
            {...register("password", {
              required: 'La contraseña es requerida',
              minLength: {
                value: 4,
                message: 'La contraseña debe tener al menos 4 caracteres',
              },
              maxLength: {
                value: 20,
                message: 'La contraseña no puede exceder los 20 caracteres',
              }})}
                    placeholder="Ingresá tu contraseña" />
            {errors.password && <p className="input-error">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="button button--md"
          >
            Ingresar
          </button>
        </form>
      </div>
    </section>
  );
}
