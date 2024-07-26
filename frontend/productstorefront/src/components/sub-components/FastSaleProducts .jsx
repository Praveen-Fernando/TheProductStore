// src/FastSaleProducts.jsx
import React from "react";

// Sample product data
const products = [
  {
    id: 1,
    name: "Product 1",
    price: "$19.99",
    image: "https://via.placeholder.com/150?text=Product+1",
  },
  {
    id: 2,
    name: "Product 2",
    price: "$29.99",
    image: "https://via.placeholder.com/150?text=Product+2",
  },
  {
    id: 3,
    name: "Product 3",
    price: "$39.99",
    image: "https://via.placeholder.com/150?text=Product+3",
  },
  {
    id: 4,
    name: "Product 4",
    price: "$49.99",
    image: "https://via.placeholder.com/150?text=Product+4",
  },
  {
    id: 5,
    name: "Product 5",
    price: "$59.99",
    image: "https://via.placeholder.com/150?text=Product+5",
  },
  {
    id: 6,
    name: "Product 6",
    price: "$69.99",
    image: "https://via.placeholder.com/150?text=Product+6",
  },
  {
    id: 7,
    name: "Product 7",
    price: "$79.99",
    image: "https://via.placeholder.com/150?text=Product+7",
  },
  {
    id: 8,
    name: "Product 8",
    price: "$89.99",
    image: "https://via.placeholder.com/150?text=Product+8",
  },
  {
    id: 9,
    name: "Product 9",
    price: "$99.99",
    image: "https://via.placeholder.com/150?text=Product+9",
  },
  {
    id: 10,
    name: "Product 10",
    price: "$109.99",
    image: "https://via.placeholder.com/150?text=Product+10",
  },
];

// Function to get random products
const getRandomProducts = (num) => {
  // Shuffle the products array and return the first 'num' products
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const FastSaleProducts = () => {
  const selectedProducts = getRandomProducts(8);

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="mb-6 text-2xl font-bold">Fast Sale Products</h2>
      <div className="grid w-full max-w-6xl grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {selectedProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-32 mb-4 rounded"
            />
            <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FastSaleProducts;
