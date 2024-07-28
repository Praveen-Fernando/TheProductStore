// src/pages/NotFound.js

import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100">
      <h1 className="mb-4 text-6xl font-bold text-red-800 md:text-6xl">
        Unauthorized Access
      </h1>
      <img
        src="src/images/access_denied.png"
        alt="404 Not Found"
        className="w-3/4 max-w-lg mb-6"
      />
      <p className="mb-6 text-gray-600">
        You are not authorized to access the Application.
      </p>
      <p className="mb-6 text-gray-600">
        Please contact Tech Support if you feel you have reached this message
        error.
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

export default Unauthorized;
