import './Footer.scss';
import { Link } from "react-router-dom";
import Assistant from "@/components/ui/Assistant/Assistant";
import assistants from "@/data/assistants.json";
const Footer = () => {
  return (
    <footer>
      <div className="inner-footer">
        <div className="col">
          <h2>ÁUREA</h2>
          <p>Cosmética de alta eficacia con ingredientes botánicos cuidadosamente seleccionados.</p>
        </div>
        <div className="col">
          <ul>
            <h3>Tienda</h3>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Todos los productos</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <div className="col">
          <ul>
            <h3>Empresa</h3>
            <li><Link to="/">Nuestra historia</Link></li>
            <li><Link to="/">Sostenibilidad</Link></li>
            <li><Link to="/">Prensa</Link></li>
          </ul>
        </div>
        <div className="col assistants-col">
          <h3>Equipo</h3>
          <ul>
              {assistants.map((assistant) => (
                <li key={assistant.name}>
                  <Assistant  name={assistant.name} role={assistant.role} email={assistant.email} picture={assistant.picture} />
                </li>
                ))}
          </ul>
        
          </div>
        <div className="copyright-bar">
          <span>© 2026  Áurea. Todos los derechos reservados.</span> 
          <ul>
            <li><Link to="/">Política de privacidad</Link></li>
            <li><Link to="/">Legales</Link></li>
            <li><Link to="/">Cookies</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer