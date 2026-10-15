import { useEffect, useState } from "react";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import Home from "@/views/Home/Home";
import CartView from "@/views/Cart/CartView";
import Products from "@/views/Products/Products";
import ProductCard from "@/components/ui/products/ProductCard/ProductCard"
import ProductDetail from "@/views/ProductDetail/ProductDetail";
import Contact from "@/views/Contact/Contact";
import ProductFormContainer from "@/components/ui/Forms/ProductFormContainer";
import MainContainer from "@/components/MainContainer/MainContainer";
import { CartProvider } from "./context/CartContext";

import sections from "@/sections/sections.json";

import "@/App.css";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  let section = sections[location.pathname];

  if (location.pathname.startsWith("/productos/")) {
    const slug = location.pathname.split("/")[2];

    const product = products.find((product) => product.slug === slug);

    section = {
      currentSection: "Productos",
      currentProduct: product ? product.name : "Producto",
      sectionTitle: product ? product.name : "Producto",
    };
  }

  return (
    <>
      <Header />

      {section && (
        <SectionHeader
          currentSection={section.currentSection}
          currentProduct={section.currentProduct}
          sectionTitle={section.sectionTitle}
        />
      )}

      <MainContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:slug" element={<ProductDetail />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/carrito-de-compras" element={<CartView />} />
        </Routes>
      </MainContainer>
      <ProductFormContainer />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
