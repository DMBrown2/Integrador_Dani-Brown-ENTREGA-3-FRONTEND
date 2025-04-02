import React from 'react'
import Banner from '../../Layout/Banner/Banner'
import Caracteristicas from '../../Layout/Caracteristicas/Caracteristicas'
import ProductContainer from '../../components/ProductsContainer/ProductContainer'
import OrderModal from '../../Layout/OrderModal/OrderModal'


export default function Inicio() {
  return (
    <>
      <Banner />
      <ProductContainer />
      <Caracteristicas />
      <OrderModal />


    </>
  )
}
