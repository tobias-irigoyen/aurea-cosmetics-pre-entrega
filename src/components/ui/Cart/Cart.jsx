import './Cart.scss';
import { useCart } from "../../../context/CartContext";
import { Trash } from "lucide-react";

const Cart = () => {
  const { items, removeFromCart } = useCart();

  return (
    <div className="cart">
      <div>
        {items.map((item) => (
          <div key={item.product.id} className="cart-item">
            <div className="product-image-container">
              <img src={item.product.image} alt={item.product.name} />
            </div>
            <div className="cart-item-data">
              <span className="product-category">{item.product.category}</span>
              <h2>{item.product.name}</h2>
              <ul>
                <li>Cantidad: {item.quantity}</li>
                <li>Subtotal: ${item.product.price}</li>
              </ul>

              <button className="delete-item-button" onClick={() => removeFromCart(item.product.id)}>
                <span className="sr-only">Borrar</span>
                <Trash size={16} color="#B30404" />
              </button>
            </div>
          </div>
        ))}
        { items.length === 0 && <h2>El carrito está vacío</h2> }
        {items.length > 0 && <h2>Subtotal: ${items.reduce((total, item) => total + item.product.price * item.quantity, 0)}</h2>}
      </div>
      { items.length != 0 &&
        <div className="cart-resume">
          <h2>Resumen del pedido</h2>
          <ul>
            <li><span className="light-text">Subtotal:</span><span>$75</span></li>
            <li><span className="light-text">Envío:</span><span>Gratuito</span></li>
            <li className="total-price"><span>Total:</span><span className="total-price-amount">$75</span></li>
          </ul>
          <span className="light-text text-xs">IVA incluido</span>
          <div className="button-container">
            <button className="primary-button">Finalizar compra</button>
            <button className="tertiary-button">Seguir comprando</button>
          </div>
          <div>
            <ul className="sell-features">
              <li className="light-text text-xs">✓ Pago 100% seguro</li>
              <li className="light-text text-xs">✓ Devolución gratuita 30 días</li>
            </ul>

          </div> 
      </div> }
    </div>
  );
};

export default Cart;