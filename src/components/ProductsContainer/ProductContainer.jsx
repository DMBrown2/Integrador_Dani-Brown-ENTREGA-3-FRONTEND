// import { set } from "react-hook-form";
import { URL } from "../../config/env.config";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductContainer.css";
import axios from "axios";
import { useEffect, useState } from "react";


// const URL = import.meta.env.VITE_API_URL

export default function ProductContainer() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const response = await axios.get(`${URL}/products`)
      const productos = response.data.products

      setProducts(productos)

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
      key={product._id} 
      product={product} />
      ))}

      <div className="btn-vermas">
        <button>Ver más</button>
      </div>
    </div>

  </section>
  )
}
