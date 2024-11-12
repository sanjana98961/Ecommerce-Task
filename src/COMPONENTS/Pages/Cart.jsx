import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";

function CartPage() {
  const { cart, removeFromCart, clearCart, totalItems, totalValue } = useContext(CartContext);

  return (
    <div>
      <NavBar />
      <main className="mx-4 sm:mx-10 my-2" aria-labelledby="cart-page">
        <h1 id="cart-page" className="sr-only">Shopping Cart Page</h1>
        <header className="flex justify-between mr-10 mb-5 mt-2">
          <h2 className="text-xl ml-5 sm:text-2xl font-semibold my-2" id="cart-heading">Your Cart</h2>
          {cart.length !== 0 && (
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-6 py-1 rounded-lg font-semibold"
              aria-label="Clear all items from cart"
            >
              Clear Cart
            </button>
          )}
        </header>
        
        {cart.length === 0 ? (
          <p className="ml-5">
            Your cart is empty.{" "}
            <Link to="/" className="text-blue-600" aria-label="Return to the home page">
              Go back to Home Page
            </Link>.
          </p>
        ) : (
          <>
            <section aria-labelledby="product-section" className="flex flex-col md:flex-row md:justify-between w-full">
              {/* Product Section */}
              <div className="flex-1 md:max-w-[70%] w-full" aria-live="polite" aria-relevant="additions removals">
                <h2 id="product-section" className="sr-only">Products in Cart</h2>
                {cart.map((product) => (
                  <div
                    className="flex flex-col md:flex-row items-center justify-between p-5 border-b mb-4 md:mb-0"
                    key={product._id}
                    aria-labelledby={`product-title-${product._id}`}
                  >
                    <div className="flex items-center md:w-1/2">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-32 h-32 object-contain mb-4 md:mb-0"
                        aria-hidden="true"
                      />
                      <div className="flex flex-col ml-6 sm:text-start md:text-left">
                        <span id={`product-title-${product._id}`} className="font-semibold">
                          Product: {product.title}
                        </span>
                        <span>Quantity: {product.quantity}</span>
                        <span>Product Price: ${product.price}</span>
                        <span>Total Price: ${(product.price * product.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded mt-4 md:mt-0"
                      aria-label={`Remove ${product.title} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary Section */}
              <aside className="flex-1 border border-gray-300 rounded-lg p-5 h-[30vh] md:mt-0 md:mx-8 md:max-w-[35%] max-w-[50]" aria-labelledby="order-summary">
                <h2 id="order-summary" className="font-light text-xl sm:text-2xl">Order Summary</h2>
                <div className="my-4 flex justify-between text-lg">
                  <span>Total Items</span>
                  <p>{totalItems}</p>
                </div>
                <div className="my-4 flex justify-between font-medium text-lg">
                  <span>Total Value</span>
                  <span>${totalValue.toFixed(2)}</span>
                </div>
              </aside>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default CartPage;
