import React from "react";
import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100">
      <img
        src="src/images/404.svg"
        alt="404 Not Found"
        className="w-3/4 max-w-lg mb-6"
      />
      <h1 className="mb-4 text-6xl font-bold text-gray-800 md:text-6xl">404</h1>
      <p className="mb-4 text-lg text-gray-600 md:text-xl">Page Not Found</p>
      <p className="mb-6 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound404;
