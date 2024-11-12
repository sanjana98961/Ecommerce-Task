import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import { AddShoppingCartOutlined, ShoppingBag, ShoppingCart } from "@mui/icons-material";

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (!savedProducts) {
      axios
        .get("https://fakestoreapi.com/products")
        .then((response) => {
          const productData = response.data;
          localStorage.setItem("products", JSON.stringify(productData));
          setProducts(productData);
          setFilteredProducts(productData); 
        })
        .catch((error) => console.error("Error fetching products:", error));
    } else {
      const productData = JSON.parse(savedProducts);
      setProducts(productData);
      setFilteredProducts(productData); 
    }
    
    const savedCategory = localStorage.getItem("category");
    const savedSortBy = localStorage.getItem("sortBy");
    if (savedCategory) {
      setCategory(savedCategory);
    }
    if (savedSortBy) {
      setSortBy(savedSortBy);
    }
  }, []);

  const handleFilterChange = () => {
    let filtered = [...products];
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filtered);
    localStorage.setItem("category", category);
    localStorage.setItem("sortBy", sortBy);
  };

  useEffect(() => {
    handleFilterChange();
  }, [category, sortBy, products]);

  const clearLocalStorage = () => {
    localStorage.removeItem("category");
    localStorage.removeItem("sortBy");
    setCategory("");
    setSortBy("");
    setFilteredProducts(products);
  };

  return (
    <div>
      <NavBar />
      <main className="mx-4 sm:mx-10 my-6" aria-labelledby="product-listing">
        <section className="mb-4 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          {/* Filter and Sorting */}
          <select
            id="category"
            aria-label="Filter by category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          
          <select
            id="sortBy"
            aria-label="Sort products"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Sort by Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          
          <button
            onClick={clearLocalStorage}
            className="p-2 border rounded bg-red-500 text-white"
            aria-label="Clear all filters"
          >
            Clear Filters
          </button>
          <ShoppingCart fontSize="large" className="cursor-pointer text-green-600" onClick={()=>navigate('/cart')}/>
        </section>

        {/* Grid to show the product */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-live="polite">
          {filteredProducts.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              className="border p-4 rounded-lg shadow hover:shadow-lg" 
              aria-label={`View details for ${product.title}`}
            >
              <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-2" />
              <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
              <p className="text-gray-500">${product.price}</p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}

export default ProductListing;
