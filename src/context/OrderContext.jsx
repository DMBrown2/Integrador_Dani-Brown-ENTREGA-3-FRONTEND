import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const OrderContext = createContext();
export const useOrder = () => useContext(OrderContext);



function OrderProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const [ count, setCount ] = useState(0)
    const [ total, setTotal ]   = useState(0) 
    
    const [cart, setCart] = useState([])

    useEffect(() => {
      let contador = 0
      let total = 0

      cart.forEach((item) => {
        contador += item.quantity
        total += item.price * item.quantity
      })

      setCount(contador)
      setTotal(total)

    }, [cart]) //cada vez que cambie el carrito, se va a ejecutar el useEffect.


  function toggleCart() {
    setIsOpen(!isOpen)
  }


  function addToCart(product, quantity = 1, showAlert = true) {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item.id === product.id);
  
      if (productInCart) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity } // Sumar la cantidad seleccionada
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  
    if (showAlert) {
      Swal.fire({
        title: "Producto agregado con éxito!",
        text: `${product.title} se agregó al carrito`,
        icon: "success",
        toast: true,
        position: "top-end",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }


  function increaseQuantity(product) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 } // Asegurar que solo suma 1
          : item
      )
    );
  }
  
  


function removeFromCart (productID) {
  setCart((prevCart) => prevCart.filter((item) => item.id !== productID	))
}
  

function decreaseQuantity(product) {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === product.id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
}


function updateQuantity(product, newQuantity) {
  let quantity = parseInt(newQuantity, 10) // Convertir a número

  if (isNaN(quantity) || quantity < 1) return // Evita valores inválidos

  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === product.id ? { ...item, quantity } : item
    )
  )
}

const handleClearCart = () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esto eliminará todos los productos del carrito.",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    cancelButtonColor:  "#3085d6",
    confirmButtonText: "Sí, vaciar carrito",
    confirmButtonColor: "#d33",
    customClass: {
      cancelButton: "swal-cancel-btn", 
      confirmButton: "swal-confirm-btn", 
    },
  }).then((result) => {
    if (result.isConfirmed) {
      setCart([]); // Vaciar el carrito
      Swal.fire("Carrito vaciado", "Todos los productos han sido eliminados.", "success");
    }
  });
}
 
  

  return  (
  <OrderContext.Provider 
  value={{ 
  cart,  //array de prod.
  toggleCart, //funcion para abrir y cerrar el modal.
  isOpen, //estado del carrito.
  addToCart,
  count, //cantidad de productos en el carrito.
  total, //total de la compra.
  decreaseQuantity, //disminuir cantidad de productos en el carrito. 
  updateQuantity,
  removeFromCart,
  handleClearCart,
  increaseQuantity
   }}>
    {children}
    </OrderContext.Provider> 
    )
}

export default OrderProvider