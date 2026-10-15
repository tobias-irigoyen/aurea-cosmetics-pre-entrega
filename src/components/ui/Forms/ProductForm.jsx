import "./ProductForm.scss";
const ProductForm = ({
  formData,
  handleChange,
  handleImgChange,
  handleSend,
}) => {
  return (
    <form className="product-form" onSubmit={handleSend}>
      <h3>Agregar Nuevo Producto</h3>
      <div className="form-group">
        <label>Nombre del Producto</label>
        <input
          type="text"
          placeholder="Ej: Teclado Mecánico"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Precio</label>
        <div className="input-group">
          <span>$</span>
          <input
            type="number"
            placeholder="Ej: 95"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Imagen del producto</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImgChange}
        />
      </div>

      <button className="primary-button save-product" type="submit">Guardar Producto</button>
    </form>
  );
};

export default ProductForm;