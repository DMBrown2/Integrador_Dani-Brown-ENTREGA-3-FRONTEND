import { useOrder } from '../../context/OrderContext'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { env } from '../../config/env.config'
import './DetalleCard.css'
import Swal from 'sweetalert2'


export default function DetalleCard() {
  
 const [ product, setProduct] = useState(null)
 const {addToCart, cart} = useOrder()
 
  const { id } = useParams()

  // const [quantity, setQuantity] = useState(1)

  const cartProduct = cart.find((item) => item.id === product?.id); 
const [selectedQuantity, setSelectedQuantity] = useState(cartProduct?.quantity || 1); // Tomar la cantidad real del carrito

const handleQuantityChange = (e) => {
  setSelectedQuantity(parseInt(e.target.value, 10));
};



  useEffect(() => {
  getDetalleCard()
 }, [])

 const getDetalleCard = async() => {

  try {
    const response  = await axios.get(`${env.URL}/products/${id}`)
    
    setProduct(response.data)

  } catch (error) {
    console.log(error)
    Swal.fire("Error")
  }
}

  return (
    <>
      <div className="detalle-card1">
        <div className="contenedor-imagen">
          <img
            className="detalle-img"
            src={product?.image}
            alt={product?.title}
          />
          <div className="status">
            <p>{product?.category}</p>
          </div>
        </div>
        <div className="contenedor-info">
          <div className="genero">{product?.genre}</div>
          <h1 className="titulo-detalle">{product?.title}</h1>
          <h2 className="precio">${product?.price}</h2>
          <p className="detalle-info">
            La joven modista Sira Quiroga abandona Madrid en los meses previos a la
            Guerra Civil Española, arrastrada por el amor desbocado hacia un hombre a
            quien apenas conoce. Juntos se instalan en Tánger, donde todo lo
            impensable puede hacerse realidad. Incluso la traición y el abandono
          </p>
          <select className="cant-prod" name="cant-prod" id="cant-prod" value={selectedQuantity}
            onChange={handleQuantityChange}>
            <option>Cantidad</option>
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
