import { Link } from "react-router-dom";
import Authentication from "../auth/Authentication";
import { useEffect, useState } from "react";
import { ProductService } from "../service/ProductService";

export default function Products() {
  // const { productInfo } = Authentication();
  // console.log(productInfo);

  const [productsInfo, setProductsInfo] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const products = await ProductService.getCurrentUserProduct(token);
      setProductsInfo(products);
    } catch (error) {
      console.log("Error fetching :", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between p-0 bg-white">
        <h2 className="mb-4 text-2xl font-bold">Product Store</h2>
        <Link to={`/seller/addproduct`}>
          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Add Product
          </button>
        </Link>
      </div>
      <div className="p-4 border rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Product #
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Qty
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productsInfo.map((product, productID) => (
                <tr key={productID}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.productStock}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src="https://via.placeholder.com/20"
                    alt="Item"
                    className="inline-block mr-2"
                  />
                </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.productCategory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.productPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/seller/editproduct`}>
                      {" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Manage
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}

              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
