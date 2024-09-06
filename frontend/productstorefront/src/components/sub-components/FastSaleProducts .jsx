import React, { useEffect, useState } from "react";
import { ProductService } from "../service/ProductService";

export default function FastSaleProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllSaleProducts();
  }, []);

  const fetchAllSaleProducts = async () => {
    try {
      const items = await ProductService.getAllSaleProducts();
      setProducts(items);
      console.log(items);
    } catch (error) {
      console.error("Error fetching Product information:", error);
    }
  };

  return (
    <div className="flex flex-col p-1">
      <h2 className="mb-6 text-2xl font-bold">Fast Sale Products</h2>
      <div className="flex flex-col justify-between md:flex-row">
        <h2 className="mb-6 font-bold text-m dark:text-blue-500"></h2>
      </div>
      <div className="flex flex-col items-center p-1">
        <div className="grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <div
              key={product.productID}
              onClick={() => handleProductClick(product)}
              className="p-4 rounded cursor-pointer hover:bg-blue-100"
            >
              <img
                src="src/images/Sample-Product.png"
                alt="{product.productName}"
                className="object-cover rounded transition-opacity duration-300 w-48 h-48"
              />
              <h3 className="mt-2 text-lg font-bold">{product.productName}</h3>
              <p className="text-gray-600">Rs.{product.productPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
