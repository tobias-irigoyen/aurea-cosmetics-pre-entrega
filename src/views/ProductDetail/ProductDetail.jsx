import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader";

function ProductDetail() {
  const { slug } = useParams();

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

  const product = products.find(
    (product) => product.slug === slug
  );

  if (loading) {
    return <h1>Cargando producto...</h1>;
  }

  if (!product) {
    return <h1>Producto no encontrado</h1>;
  }

  return (
    <div>
      <img
        src={product.image}
        alt={product.name}
      />

      <h1>{product.name}</h1>

      <p>${product.price}</p>

      <p>{product.description}</p>

      <button>
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductDetail;
