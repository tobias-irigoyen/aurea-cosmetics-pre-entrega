import "./Products.scss";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ui/products/ProductCard/ProductCard";
import Breadcrumbs from "../../components/ui/BreadCrumbs/BreadCrumbs";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader";

const Products = () => {
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
    <main>
      <section className="products-grid">
        {loading && <h2 className="loading-products">Cargando productos</h2>}
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
          />
        ))}
      </section>
    </main>
  );
};

export default Products;
