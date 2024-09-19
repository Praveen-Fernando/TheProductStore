import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Authentication from "../auth/Authentication";
import { UserService } from "../service/UserService";
import { ProductService } from "../service/ProductService";

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = Authentication();
  const navigate = useNavigate();

  const handleDelete = (productID) => {
    // Filter out the product to delete
    const updatedCart = cart.filter((item) => item.productID !== productID);
    setCart(updatedCart);
  };

  const totalAmount = cart.reduce((total, product) => {
    return total + product.productPrice * (product.quantity || 1);
  }, 0);

  const handleConfirmOrder = async () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      console.log("Authenticated");
      const token = localStorage.getItem("token");
      const orderData = cart.map((product) => ({
        productID: product.productID,
        quantity: product.quantity,
      }));

      // Correct payload structure
      const payload = {
        products: orderData,
        totalAmount: totalAmount,
        jwtToken: token,
      };

      console.log("Payload being sent:", payload);

      try {
        setLoading(true); // Set loading state to true

        // Call the OrderProduct method
        const response = await ProductService.OrderProduct(payload, token);
        console.log("Order confirmed:", response);

        navigate("/payment");
      } catch (error) {
        console.error("Error confirming order:", error);
        // Handle error (e.g., show an error message)
      } finally {
        setLoading(false); // Set loading state back to false
      }
    }
  };

  return (
    <div className="p-4 ml-auto mr-auto max-w-7xl">
      <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>

      <div className="p-4 border rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Product Name
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Qty
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
              {cart.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    Your cart is empty.
                  </td>
                </tr>
              ) : (
                cart.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-blue-600 whitespace-nowrap hover:text-blue-600">
                      <Link to={"/viewproduct/:productID"}>
                        {product.productName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.quantity || 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Rs.
                      {(product.productPrice * (product.quantity || 1)).toFixed(
                        2
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(product.productID)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Display total amount */}
        {cart.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-xl font-bold">
              Total Amount: Rs.{totalAmount.toFixed(2)}
            </p>
            {/* Confirm Order Button */}
            {cart.length > 0 && (
              <div className="flex justify-end mt-2">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={() => handleConfirmOrder()}
                >
                  Confirm Order
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
