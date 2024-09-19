import { Link } from "react-router-dom";
import LoggedComponent from "../auth/LoggedComponent";
import LoginComponent from "../auth/LoginComponent";
import Authentication from "../auth/Authentication";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../userspage/CartContext";
import { useContext } from "react";

export default function PublicHeader() {
  const { isAuthenticated, handleLogout } = Authentication();
  const { cart } = useContext(CartContext);
  // const itemCount = cart.reduce(
  //   (total, product) => total + (product.quantity || 1),
  //   0
  // );
  console.log(cart.length);

  return (
    <div class="bg-white border-gray-200 dark:bg-gray-900 p-4">
      <div class="flex flex-wrap justify-end items-center mx-auto text-base max-w-screen-xl">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
        </a>
        <div class="flex items-center space-x-6 rtl:space-x-reverse">
          <Link to="/sellerregister">
            <a
              href="tel:5541251234"
              class="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              Become a Seller
            </a>
          </Link>
          <Link to="/help">
            <a
              href="tel:5541251234"
              class="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              Help & Support
            </a>
          </Link>
        </div>
      </div>

      <header>
        {/* Mobile View: First Row */}
        <div className="flex items-center justify-between w-full pt-5 md:hidden">
          <Link to="/">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
              <img
                src="src/images/logo.png"
                class="h-8"
                alt="The Product Store"
              />
            </a>
          </Link>
          <div class="flex flex-wrap justify-between pr-2">
            {isAuthenticated ? <LoggedComponent /> : <LoginComponent />}
            <div style={{ color: "white", marginTop: "2px" }}>
              <Link to="/cart">
                <button className="relative flex items-center p-2 text-white hover:bg-blue-600">
                  <FaShoppingCart className="text-xl" />
                  {/* Add cart item count */}
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -m-2 text-xs text-white bg-red-600 rounded-full">
                    {cart.length}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Mobile View: Second Row */}
        <div className="flex justify-center mt-4 md:hidden">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
          />
        </div>

        {/* Desktop View */}
        <div class="max-w-screen-xl hidden md:flex flex-wrap items-center justify-between mx-auto p-4 z-0 ">
          <Link to="/">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
              <img
                src="/src/images/logo.png"
                class="h-8"
                alt="The Product Store"
              />
            </a>
          </Link>
          <div className="flex-grow mx-10">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? <LoggedComponent /> : <LoginComponent />}
            <div style={{ color: "white" }}>
              <Link to="/cart">
                <button className="relative flex items-center p-2 text-white hover:bg-blue-600">
                  <FaShoppingCart className="text-xl" />
                  {/* Add cart item count */}
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -m-2 text-xs text-white bg-red-600 rounded-full">
                    {cart.length}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
