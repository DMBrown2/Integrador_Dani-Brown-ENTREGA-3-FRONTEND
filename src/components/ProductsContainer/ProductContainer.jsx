import ProductCard from "../ProductCard/ProductCard";
import "./ProductContainer.css";
import axios from "axios";
import { useEffect, useState } from "react";

const URL = 'https://67cb83443395520e6af589f6.mockapi.io/api/v1/'

export default function ProductContainer() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const {data} = await axios.get(`${URL}/products`)

      setProducts(data)
    } catch (error) {
      console.log(error)   
    }
  }

  return (
    <section className="product-gallery">
    <h3 className="section-title">Destacados</h3>
    <div className="product-container">
      {products.map((product) => (
        <ProductCard 
      key={product.id} 
      product={product} />
      ))}

      <div className="btn-vermas">
        <button>Ver más</button>
      </div>
    </div>

  </section>
  )
}
