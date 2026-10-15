import { createContext, useContext, useEffect, useReducer, useMemo, useCallback } from "react";

const CartContext = createContext();

const getInitialState = () => {
  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    try {
      return {
        items: JSON.parse(savedCart),
      };
    } catch (error) {
      console.error("Error al recuperar el carrito:", error);
    }
  }

  return {
    items: [],
  };
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity } = action.payload;

      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        const newQuantity =
          existingItem.quantity + quantity;

        const finalQuantity = Math.min(
          newQuantity,
          product.stock
        );

        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: finalQuantity,
                }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            product,
            quantity: Math.min(quantity, product.stock),
          },
        ],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.payload
        ),
      };

    case "CLEAR_CART":
      return {
        items: [],
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    getInitialState
  );

  // Guardar el carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(state.items)
    );
  }, [state.items]);

  const addToCart = useCallback((product, quantity) => {
    if (quantity <= 0) return;
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity },
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const value = useMemo(() => ({
    items: state.items,
    addToCart,
    removeFromCart,
    clearCart,
  }), [state.items, addToCart, removeFromCart, clearCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}