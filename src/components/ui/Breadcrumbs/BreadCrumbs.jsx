import "./BreadCrumbs.scss";
import { Link } from "react-router-dom";
const BreadCrumbs = ({
  currentSection,
  currentProduct
}) => {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Inicio</Link>

      <span className="divider">/</span>

      {currentProduct ? (
        <Link to="/productos">
          {currentSection}
        </Link>
      ) : (
        <span>{currentSection}</span>
      )}  


      {currentProduct && (
        <>
          <span className="divider">/</span>
          <span>{currentProduct}</span>
        </>
      )}
    </nav>
  );
};
export default BreadCrumbs;