import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ui/products/ProductCard/ProductCard";
import './Home.scss';
import {ArrowRight} from "lucide-react";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <h1 className="sr-only">Inicio</h1>
      <div className="main">
        <section className="hero-section">
            <span className="top-text">Cosmética de autor · Desde 2014</span>
            <h2 className="hero-title">
              <span>El ritual</span>
              <span>que tu piel</span>
              <span>merece</span>
            </h2>
            <p>Formulaciones de alta eficacia con ingredientes botánicos selectos. Ciencia y naturaleza en perfecta armonía.</p>
            <div className="button-group">
              <Link to="/productos" className="primary-button">Explorar colección <ArrowRight size={20} /></Link>
              <button className="secondary-button">Nuestra historia</button>
            </div>
          </section>
          <section>
            <span className="top-text">Los más vendidos</span>
            <h2>Favoritos de la colección</h2>
            <div className="products-grid">
              {loading && (
                <h2 className="loading-products">Cargando productos</h2>
              )}
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
            </section>
      </div>
    </>
  );
}

export default Home;
