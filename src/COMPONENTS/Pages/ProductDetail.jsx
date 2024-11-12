import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../CartContext";
import { Add } from "@mui/icons-material";
import NavBar from "../NavBar";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
    localStorage.getItem("category");
    localStorage.getItem("sortBy");
  }, [id]);

  if (loading) return <p role="status" aria-live="polite">Loading...</p>;
  if (!product) return <p role="alert">Product not found.</p>;

  return (
    <main>
      <NavBar />
      <section className="mx-4 sm:mx-10 my-6 flex flex-col md:flex-row items-center md:items-start">
        <figure className="w-full mt-4 md:w-1/2 h-[30rem] object-contain mb-4 md:mb-0">
          <img
            src={product.image}
            alt={`Image of ${product.title}`}
            className="w-full"
            aria-describedby="product-description"
          />
        </figure>
        <div className="md:ml-8 flex flex-col items-start lg:mt-10 md:mt-10 md:text-left">
          <h1 className="text-2xl sm:text-4xl font-semibold mb-4" id="product-title">
            {product.title}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-4" id="product-description">
            {product.description}
          </p>
          <p className="text-lg sm:text-xl font-bold mb-6">${product.price}</p>

          <button
            onClick={() => handleAddToCart(product)}
            className="bg-green-500 text-white text-lg font-semibold px-4 sm:px-6 py-2 rounded"
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
