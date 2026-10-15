import { useState, useEffect } from "react";
import "./NavBar.css";
import { Search, UserRound, ShoppingBag, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const NavBar = () => {
  const { items } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const cartQuantity = items.reduce((total, item) => total + item.quantity, 0);
  
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Áurea
      </Link>

      <ul className={`navbar-links${menuOpen ? " is-open" : ""}`}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li className="mobile-extra">
          <a href="#"><Search size={20} /> Buscar</a>
        </li>
        <li className="mobile-extra">
          <a href="#"><UserRound size={20} /> Perfil</a>
        </li>
      </ul>

      <div className="navbar-actions">
        <a href="#" className="desktop-action" aria-label="Buscar">
          <Search />
        </a>
        <a href="#" className="desktop-action" aria-label="Perfil">
          <UserRound />
        </a>
        <Link to="/carrito-de-compras" className="shopping-bag">
          <ShoppingBag />
          Carrito
          <span>({cartQuantity})</span>
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;