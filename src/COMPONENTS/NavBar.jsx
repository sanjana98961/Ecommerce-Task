import React from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const isProductDetail = matchPath('/product/:id', location.pathname);
  const isCartItem = location.pathname === '/cart';

  return (
    <header>
      <div className="px-4 py-2">
        <h1
          className="bg-slate-400 pl-2 py-2 rounded-lg font-bold mb-4 text-xl sm:text-3xl text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          {isProductDetail ? 'Product Detail' : isCartItem ? 'Cart Page' : 'Home Page'}
        </h1>
        
        <nav
          className="flex items-center font-semibold shadow pl-1 space-x-2 text-gray-600"
          aria-label="Breadcrumb"
        >
          <button
            className={`text-md cursor-pointer hover:underline ${isProductDetail || isCartItem ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={handleNavigateHome}
            aria-label="Navigate to Home"
          >
            Home
          </button>
          
          {isProductDetail && (
            <>
              <span aria-hidden="true" className="text-md">/</span>
              <span aria-current="page" className="text-md">Product Detail</span>
            </>
          )}
          
          {isCartItem && (
            <>
              <span aria-hidden="true" className="text-md">/</span>
              <span aria-current="page" className="text-md">Cart Item</span>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
