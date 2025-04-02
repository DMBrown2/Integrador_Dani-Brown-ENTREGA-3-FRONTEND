import { useOrder } from "../../context/OrderContext";
import Order from "../../pages/Order/Order";
import "./OrderModal.css";

export default function OrderModal({decreaseQuantity}) {

  const { isOpen, toggleCart } = useOrder();

  if(!isOpen) return;

  return (
    <div className="modal-overlay" onClick={ () => toggleCart() }>
      <div className="modal-content" onClick={ (e) => e.stopPropagation() }>
        <div className="modal-header">
          <h2>Detalle de compra</h2> 
        </div>
        <div className="modal-body">
          <Order decreaseQuantity={decreaseQuantity}/>
        </div>
        <div className="modal-footer">
          <button className="button-close" onClick={ () => toggleCart() }>
              Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
