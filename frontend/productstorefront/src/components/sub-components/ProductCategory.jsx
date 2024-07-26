import React from "react";
import {
  FaLaptop,
  FaTshirt,
  FaBook,
  FaPuzzlePiece,
  FaCouch,
  FaLeaf,
  FaFutbol,
  FaCar,
  FaShoppingCart,
  FaTree,
} from "react-icons/fa";

const ProductCategories = () => {
  return (
    <div className="flex flex-col items-center p-4">
      {/* First row of categories */}
      <div className="flex flex-wrap justify-center mb-4">
        <a
          href="#"
          className="flex items-center px-4 py-2 m-1 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
        >
          <FaLaptop className="mr-2 text-2xl" />
          <span>Electronics</span>
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 m-1 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
        >
          <FaTshirt className="mr-2 text-2xl" />
          <span>Clothing</span>
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 m-1 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
        >
          <FaBook className="mr-2 text-2xl" />
          <span>Books</span>
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 m-1 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
        >
          <FaPuzzlePiece className="mr-2 text-2xl" />
          <span>Toys</span>
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 m-1 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
        >
          <FaCouch className="mr-2 text-2xl" />
          <span>Furniture</span>
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 m-1 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
        >
          <FaLeaf className="mr-2 text-2xl" />
          <span>Beauty</span>
        </a>
      </div>
      {/* Second row of categories */}
      <div className="flex flex-wrap justify-center">
        <a
          href="#"
          className="flex items-center px-4 py-2 m-1 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
        >
          <FaFutbol className="mr-2 text-2xl" />
          <span>Sports</span>
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 m-1 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
        >
          <FaCar className="mr-2 text-2xl" />
          <span>Automotive</span>
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 m-1 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
        >
          <FaShoppingCart className="mr-2 text-2xl" />
          <span>Groceries</span>
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 m-1 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
        >
          <FaTree className="mr-2 text-2xl" />
          <span>Garden</span>
        </a>
      </div>
    </div>
  );
};

export default ProductCategories;
