import { URL } from "../../config/env.config";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";



export default function ProductContainer() {

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1); // Página actual
  const [hasMore, setHasMore] = useState(true); // Si quedan productos para cargar
  const limit = 8; // Cantidad por página

  useEffect(() => {
    loadProducts(1)
  }, [])

  // const getProducts = async () => {
  //   try {
  //     const response = await axios.get(`${URL}/products`)
  //     const productos = response.data.products

  //     setProducts(productos)

  //   } catch (error) {
  //     console.log(error)   
  //   }
  // }

  const loadProducts = async (pageToLoad) => {
    try {
      const response = await axios.get(`${URL}/products?page=${pageToLoad}&limit=${limit}`);
      const newProducts = response.data.products;

      // Si recibimos menos que el límite, no hay más productos para mostrar
      if (newProducts.length < limit) {
        setHasMore(false);
      }

      // Agregar los productos nuevos
      if (pageToLoad === 1) {
        setProducts(newProducts); // para el primer render o al crear un producto nuevo
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
      }
    } catch (error) {
      console.error("❌ Error al obtener productos:", error);
    }
  };

  // Botón "Ver más"
  const handleVerMas = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadProducts(nextPage);
  };

  return (
    <section className="product-gallery">
   
    <h3 className="section-title">Destacados</h3>
   
    <div className="product-container">
      {products.map((product) => (
        <ProductCard 
      key={product._id} 
      product={product} />
      ))}

      {hasMore && (
        <div className="btn-vermas">
          <button onClick={handleVerMas} className="button">Ver más</button>
        </div>
      )}

      </div>
  </section>
  )
}
