import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";
import "./Order.css";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

export default function Order() {

    const { cart, total, decreaseQuantity, increaseQuantity, updateQuantity, removeFromCart, handleClearCart } = useOrder()

    return (
        <>
            <div className="order-container">

                <div className="order-wrapper">
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>IMAGEN</th>
                            <th>Titulo</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(product => (
                                <tr key={product.id}>

                                    <td><img src={product.image} alt={product.title} style={{ width: "80px", height: "100%", objectFit: "cover" }} /></td>

                                    <td>{product.title}</td>
                                    
                                    <td>${product.price}</td>


                                    <td>
                                        <div className="cantidad">
                                        <button className="btn-increase" onClick={() => decreaseQuantity(product)}>−</button>
                                        <input 
                                        type="text"
                                        value={cart.find((item) => item.id === product.id)?.quantity || 1}
                                        min="1"
                                        onChange={(e) => updateQuantity(product, e.target.value)}
                                         />
                                        <button className="	btn-decrease" onClick={() => increaseQuantity(product)}>+</button>
                                        </div>
                                    </td>


                                    <td>${product.quantity * product.price}</td>

                                    <td>
                                        <button className="btn-remove" onClick={() => removeFromCart(product.id)}>
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
                    <button className="button">Finalizar compra</button>
                    <button className="button" onClick={handleClearCart}>Vaciar carrito</button>
                </div>
            </div>
        </>
    )
}
