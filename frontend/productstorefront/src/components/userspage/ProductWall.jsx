import { Link } from "react-router-dom";
import ProductFilter from "./seller/ProductFilter";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { ProductService } from "../service/ProductService";

export default function ProductWall() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [productDetails, setProductDetails] = useState([]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const items = await ProductService.getAllProducts();
      setProducts(items);
    } catch (error) {
      console.error("Error fetching Product information:", error);
    }
  };

  useEffect(() => {
    fetchProductImages();
  }, []);

  const fetchProductImages = async () => {
    try {
      const productsImages = await ProductService.getAllProductImages();
      console.log(productsImages);
    } catch (error) {
      console.error("Error fetching Product information:", error);
    }
  };

  // const filteredProducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(filter.toLowerCase())
  // );

  return (
    <div className="flex flex-col p-10">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search products..."
          value={filter}
          onChange={handleFilterChange}
          className="w-1/4 p-2 mb-4 border border-gray-300 rounded"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {products.map((product) => (
            <Link to={`/viewproduct/${product.productID}`}>
              <div
                key={product.productID}
                onClick={() => handleProductClick(product)}
                className="border rounded shadow-md cursor-pointer p-7 hover:bg-blue-100 "
              >
                <div className="relative w-full h-48">
                  {/* {product.productImages.map((image, index) => (
                    <img
                      key={image.imageId}
                      // src={`productsImages.${image.imageUrl}`}
                      src={image.imageUrl}
                      alt={product.productName}
                      className={`absolute top-0 left-0 w-full h-full object-cover rounded transition-opacity duration-300 ${
                        index === 0 ? "opacity-100" : "opacity-0"
                      } hover:opacity-100 hover:z-10`}
                      style={{ zIndex: index === 0 ? 1 : 0 }}
                    />
                  ))} */}
                  <img
                    src="src/images/Sample-Product.png"
                    alt={product.productName}
                    className="absolute top-0 left-0 object-cover w-full h-full transition-opacity duration-300 rounded"
                  />
                </div>
                <h3 className="mt-2 text-lg font-bold">
                  {product.productName}
                </h3>
                <p className="text-gray-600">Rs.{product.productPrice}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
