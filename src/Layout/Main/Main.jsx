import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import OrderModal from "../OrderModal/OrderModal";

export default function Main() {
  return (
    <>
    <OrderModal />
    <Header />

    <main
    className="main-container">
      <Outlet />
    </main>
    <Footer />
    </>
  )
}
