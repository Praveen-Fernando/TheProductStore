import { Link } from "react-router-dom";
import LoggedComponent from "../auth/LoggedComponent";
import LoginComponent from "../auth/LoginComponent";
import Authentication from "../auth/Authentication";
import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import { FaUser } from "react-icons/fa";

export default function PublicHeader() {
  const { isAuthenticated, handleLogout } = Authentication();
  console.log(isAuthenticated);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="flex flex-wrap justify-end items-center mx-auto text-base max-w-screen-xl p-4">
        <a
          href="https://flowbite.com"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
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

      <header className="flex flex-col items-center p-4 text-white bg-gray-900 md:flex-row md:justify-between">
        {/* Mobile View: First Row */}
        <div className="flex items-center justify-between w-full md:hidden">
          <Link to="/">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="h-8"
                alt="Flowbite Logo"
              />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Product Store
              </span>
            </a>
          </Link>
          {isAuthenticated ? <LoggedComponent /> : <LoginComponent />}
        </div>
        {/* Mobile View: Second Row */}
        <div className="flex justify-center mt-4 md:hidden">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
          />
          <button className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700">
            Cart
          </button>
        </div>

        {/* Desktop View */}
        <div className="items-center justify-between hidden w-full md:flex">
          <div className="text-2xl font-bold">MyLogo</div>
          <div className="flex-grow mx-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? <LoggedComponent /> : <LoginComponent />}
            <button className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700">
              Cart
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
