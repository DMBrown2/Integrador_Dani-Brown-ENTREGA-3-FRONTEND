import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useOrder } from "../../context/OrderContext";
import { URL } from "../../config/env.config";

import "./Order.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function Order() {

    const { cart, total, decreaseQuantity, increaseQuantity, updateQuantity, removeFromCart, handleClearCart } = useOrder()

    const { user, token } = useUser()

    const enviarOrden = async () => {
        try {
            const newOrder ={
                user: user._id,
                products: cart.map(prod => ({
                    product: prod._id,
                    quantity: prod.quantity,
                    price: prod.price,
                })),
                totalAmount: total,
                totalPrice: cart.reduce((acc, prod) => acc + prod.price * (prod.quantity || 1), 0),
            }

            console.log("📦 Enviando orden con token:", token);


            await axios.post(`${URL}/orders`, newOrder, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log('✅ Orden creada con éxito:', newOrder)

            Swal.fire({
                icon: 'success',
                title: '¡Pedido realizado!',
                text: 'Tu orden fue creada correctamente',
                confirmButtonText: 'OK'
              });

            //Obtener todas las ordenes
            const response = await axios.get(`${URL}/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log('✅ Todas las ordenes:', response.data)

        } catch (error) {
            console.error('❌ Error al crear la orden:', error)
            Swal.fire({
                icon: 'error',
                title: 'Error al crear la orden',
                text: error.response?.data?.error || 'Ocurrió un problema al procesar tu pedido'
              });
              
        }
    }



    return (
        <>
            <div className="order-container">

                <div className="order-wrapper">
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Titulo</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(product => (
                                <tr key={product._id}>

                                    <td><img src={`${import.meta.env.VITE_API_URL_FILES}/products/${product.image}`} alt={product.name || product?.product?.name} style={{ width: "80px", height: "100%", objectFit: "cover" }} /></td>

                                    <td>{product.name || product?.product?.name}</td>
                                    
                                    <td>${product.price}</td>


                                    <td>
                                        <div className="cantidad">
                                        <button className="btn-increase" onClick={() => decreaseQuantity(product)}>−</button>
                                        <input 
                                        type="text"
                                        value={cart.find((item) => item._id === product._id)?.quantity || 1}
                                        min="1"
                                        onChange={(e) => updateQuantity(product, e.target.value)}
                                         />
                                        <button className="	btn-decrease" onClick={() => increaseQuantity(product)}>+</button>
                                        </div>
                                    </td>


                                    <td>${product.quantity * product.price}</td>

                                    <td>
                                        <button className="btn-remove" onClick={() => removeFromCart(product._id)}>
                                        <FontAwesomeIcon icon={faRemove} />
                                        </button>
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5}>TOTAL ${total}</td>
                        </tr>
                    </tfoot>
                </table>
                </div>

                <div className="order-buttons">
                    <button className="button" onClick={enviarOrden}>Confirmar pedido</button>

                    <button className="button" onClick={handleClearCart}>Vaciar carrito</button>
                    
                </div>
            </div>
        </>
    )
}
