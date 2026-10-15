import { Link } from "react-router-dom";
import "./ProductCard.scss";
import { useState } from 'react';
import { useCart } from "@/context/CartContext";
import FilledHeart from '@/assets/filled-heart.svg'
import EmptyHeart from '@/assets/empty-heart.svg'

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    category,
    description,
    price,
    stock,
    currency,
    badge,
    image,
    slug,
  } = product;

  const [productQty, setProductQty] = useState(0);
  const [isFav, setFav] = useState(false);
  const { addToCart } = useCart();

const toggleFav = () => {
  setFav(!isFav);
};
  const increaseProductsQty = () => {
    if (productQty < stock) {
      setProductQty(productQty + 1);
    }
  };

  const decreaseProductsQty = () => {
    if (productQty > 0 ) {
      setProductQty(productQty - 1);
    }
  };
 const showBuy = () => {
  addToCart(product, productQty);
};

  return (
    <article className="product-card">
      <div className="product-card__image">
        <Link to={`/productos/${slug}`}>
          <img src={image} alt={name} />
        </Link>
          <div>
          <span className="product-card__badge">
            {category}
          </span>

          
          <button 
          className="product-card__fav-btn" onClick={toggleFav}>
            <img src={isFav ? FilledHeart : EmptyHeart} alt={isFav ? "Quitar de favoritos" : "Agregar a favoritos"} />
          </button>
          <span >
            
          </span>
          </div>
      </div>

      <div className="product-card__content">
        <div className="product-card__info">
          <span className="product-card__category product-card__stock">
            Stock: {stock}
          </span>
        </div>

        <h2 className="product-card__title">
          {name}
        </h2>
          <span className="product-card__price">
            ${price}
          </span>

        <p className="product-card__description">
          {description}
        </p>
        
        <div className="product-card__footer">
          <div className="product-card__buy-counters">
            <button className="product-card__button" onClick={decreaseProductsQty}>-</button>
            <span>{ productQty }</span>
            <button className="product-card__button" onClick={increaseProductsQty}>+</button>
          </div>
          <button className="product-card__button product-card__buy-button" onClick={showBuy}>Añadir al carrito</button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;