import { useOrder } from '../../context/OrderContext'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { env } from '../../config/env.config'
import './DetalleCard.css'
import Swal from 'sweetalert2'
import { URL } from '../../config/env.config'

export default function DetalleCard() {

  const [product, setProduct] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { addToCart, cart } = useOrder()
  const { id } = useParams()

  useEffect(() => {
    getDetalleCard()
  }, [])


  const getDetalleCard = async () => {
  try {
    const response = await axios.get(`${URL}/products/${id}`);
    setProduct(response.data.product);
  } catch (error) {
    console.log(error);
    Swal.fire("Error");
  }
};

useEffect(() => {
  if (!product || cart.length === 0) return;

  const cartProduct = cart.find((item) => item._id === product._id);
  if (cartProduct) {
    setSelectedQuantity(cartProduct.quantity);
  } else {
    setSelectedQuantity(1); // default si no estaba
  }
}, [product, cart]);

  const handleQuantityChange = (e) => {
    setSelectedQuantity(parseInt(e.target.value, 10));
  };

  if (!product) {
   return (
    <div className="loader-container">
      <div className="loader"></div>
        <p style={{ marginTop: "1rem", fontSize: "1.2rem", color: "#4f46e5" }}>
        Cargando producto...
      </p>
    </div>
  );
}

  return (
    <>
      <div className="detalle-card1">
        <div className="contenedor-imagen">
          <img
            className="detalle-img"
            src={`${import.meta.env.VITE_API_URL_FILES}/products/${product?.image}`}
            alt={product?.name}
          />
          <div className="status">
            <p>{product?.category}</p>
          </div>
        </div>
        <div className="contenedor-info">
          <div className="genero">{product?.genre}</div>
          <h1 className="titulo-detalle">{product?.name}</h1>
          <h2 className="precio">${product?.price}</h2>
          <p className="detalle-info">
            {product?.description}
          </p>
          <select className="cant-prod" name="cant-prod" id="cant-prod" value={selectedQuantity}
            onChange={handleQuantityChange}>
            <option value="">Cantidad</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <div className="btn-comprar">
            <button onClick={() => addToCart(product, selectedQuantity)}>Agregar al carrito</button>
          </div>
        </div>
      </div>
    </>
  )
}
