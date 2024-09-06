import { Link } from "react-router-dom";

export default function LatestProducts() {
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
  const selectedProducts = getRandomProducts(8);
  return (
    <div className="flex flex-col p-1">
      <h2 className="mb-6 text-2xl font-bold">Latest Products</h2>
      <div className="flex flex-col justify-between md:flex-row">
        <h2 className="mb-6 font-bold text-m dark:text-blue-500"></h2>
        <Link to="/productswall">
          <button
            type="button"
            class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            SHOP ALL PRODUCTS
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center p-1">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="p-4 rounded cursor-pointer hover:bg-blue-100"
            >
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-48 rounded"
              />
              <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
