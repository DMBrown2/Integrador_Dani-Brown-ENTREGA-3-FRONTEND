import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { URL } from "../config/env.config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext)

export function UserProvider({ children }) {
    
  const navigate = useNavigate()
    const [user, setUser] = useState( JSON.parse(localStorage.getItem('user')) || null )
    const [token, setToken] = useState(localStorage.getItem('token') || null)


    useEffect(() => {
        user ? localStorage.setItem('user', JSON.stringify(user)) 
        : localStorage.removeItem('user')

        token ? localStorage.setItem('token', token)
        : localStorage.removeItem('token')
        
    }, [user, token])


    async function login(data) {
        try {
            const response = await axios.post(`${URL}/users/login`, data)
            const { user, token } =  response.data

            setUser(user)
            setToken(token)

            Swal.fire({
                icon: 'success',
                title: 'Login exitoso',
                text: `Bienvenido ${user.name}`,
                timer: 2000,
            }).then(() => {
                navigate('/')
            })
            
        } catch (error) {
             console.error('Error al iniciar sesión:', error)
             Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: error.response?.data?.error || 'Intenta nuevamente',
        })
    }
}

    function logout() {
        setUser(null)
        setToken(null)
    }
  

    return (
    <UserContext.Provider 
    value={{
        login,
        logout,
        user,
        token,

    }}>
      {children}
    </UserContext.Provider>
  )
}


