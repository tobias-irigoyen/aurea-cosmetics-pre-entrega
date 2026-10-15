
import { useState } from "react";
import ProductForm from "./ProductForm";

const ProductFormContainer = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const [imgFile, setImgFile] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImgChange = (event) => {
    const file = event.target.files[0];

    setImgFile(file);
  };

  const handleSend = async (event) => {
    event.preventDefault();

    if (!imgFile) {
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }

    const apiKey = import.meta.env.VITE_IMG_API_KEY;

    const imageFormData = new FormData();

    imageFormData.append("image", imgFile);

    try {
      console.log("Subiendo imagen a Imgbb...");

      const imgbbResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: imageFormData,
        }
      );

      const imgbbData = await imgbbResponse.json();

      if (!imgbbData.success) {
        throw new Error("La subida de la imagen a Imgbb falló.");
      }

      const entireProduct = {
        ...formData,
        imageUrl: imgbbData.data.url,
      };

      console.log(
        "Enviando los siguientes datos COMPLETOS a la API:",
        entireProduct
      );
    } catch (error) {
      console.error("Error en el proceso de envío:", error);

      alert(
        "Hubo un error al subir la imagen. Por favor, intentá de nuevo."
      );
    }
  };

  return (
    <ProductForm
      formData={formData}
      handleChange={handleChange}
      handleImgChange={handleImgChange}
      handleSend={handleSend}
    />
  );
};

export default ProductFormContainer;