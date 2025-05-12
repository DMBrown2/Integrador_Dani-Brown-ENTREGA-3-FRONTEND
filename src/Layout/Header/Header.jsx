import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { useUser } from '../../context/UserContext';

export default function Header() {

  const { user, logout } = useUser();

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login')
  }

  const { count, toggleCart } = useOrder()


  return (
    <div className="main-header">
      {/* MENU HAMBURGUESA  */}
      <input type="checkbox" id="burger" className="input-burger" />
      <label className="burger-container" htmlFor="burger">
        <div className="burger" />
      </label>
      {/* CLAIM + LOGO + USER INFO  */}
      <div className="contenedor-logo">
        <NavLink to="/" className="nav-link">
          <img
            className="logo"
            src="https://liberexpress.es/wp-content/uploads/2021/07/liberexpress-logo.svg"
            alt="LOGO"
          />
        </NavLink>
      </div>

      {/* USER INFO: Avatar + cart */}

      <div className="user-info">

        {user ? (
          <li className="nav-item">
            <button className="nav-link" onClick={logout}>Logout</button>
          </li>
        ) : (
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">Login</NavLink>
          </li>
        )}

        <FontAwesomeIcon icon={faUser} className="user-avatar" />

        <div className="user-cart" onClick={() => toggleCart()}>

          <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
          <span className="cart-count">{count}</span>

        </div>

      </div>

      {/* CLAIM */}
      <div className="claim-contenedor">
        <h1 className=" titulo-principal">Knowledge is</h1>
        <h2 className="palabra-resaltada">Strength.</h2>
      </div>

      {/* //MAIN NAV */}
      <nav className="main-nav">
        <ul className="nav-list">
          {/* Enlaces del menu de navegacion */}
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Inicio</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contacto" className="nav-link">Contacto</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/nosotros" className="nav-link">Nosotros</NavLink>
          </li>
          {user?.role === 'admin' && (
            <>

              <li className="nav-item">
                <NavLink to='/admin' className="nav-link">Admin producto</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/usuarios" className="nav-link">Admin Usuarios</NavLink>
              </li>
            </>

          )}

          {/* <li className="nav-item">
        <NavLink to="/suscripcion" className="nav-link">Me quiero subscribir!</NavLink>
        </li> */}


        </ul>
      </nav>
    </div>
  )
}
