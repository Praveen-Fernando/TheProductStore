import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Authentication from "../../auth/Authentication";
import { ProductService } from "../../service/ProductService";
import { useAlert } from "react-alert";
import {
  TopRightAlertContext,
  options,
} from "../../sub-components/AlertProviderWrapper";

export default function EditProduct() {
  const { profileInfo } = Authentication();
  const navigate = useNavigate();
  const { productID } = useParams();
  const alert = useAlert();
  const topRightAlert = useAlert(TopRightAlertContext);

  const [productData, setProductData] = useState({
    productName: "",
    productStock: "",
    productPrice: "",
    productCategory: "",
  });

  const fetchproductById = async (productID) => {
    try {
      const token = localStorage.getItem("token");
      const product = await ProductService.getProductById(productID, token);
      const {
        productName,
        productStock,
        productPrice,
        productCategory,
        productAddedDate,
        sellerEmail,
      } = product;

      setProductData({
        productName,
        productStock,
        productPrice,
        productCategory,
        productAddedDate,
        sellerEmail,
      });
      console.log("Product data :" + productData);
    } catch (err) {
      console.error("Error fetching product data:", err);
      //window.location.reload();
    }
  };

  useEffect(() => {
    fetchproductById(productID);
  }, [productID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevProductData) => ({
      ...prevProductData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to Update this Product details?"
      );

      if (confirmUpdate) {
        const token = localStorage.getItem("token");
        const res = await ProductService.updateProduct(
          productID,
          productData,
          token
        );
        console.log(res);
        // Redirect to profile page or display a success message
        navigate("/productStore");
        updateAlert();
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert(error);
    }
  };

  const updateAlert = () => {
    topRightAlert.show("Product Updated!", options);
  };

  const deleteProduct = async (productID) => {
    try {
      // Prompt for confirmation before deleting the user
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        const token = localStorage.getItem("token");
        await ProductService.deleteProduct(productID, token);
        navigate("/productStore");
        deleteAlert();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const deleteAlert = () => {
    topRightAlert.show("Product Deleted!", options);
  };

  return (
    <div class="flex justify-center items-center p-4">
      <div class="flex flex-col w-full max-w-6xl bg-white rounded-lg shadow-lg md:flex-row">
        <div className="flex flex-col items-center w-full p-4 border-b md:w-1/4 md:border-b-0 md:border-r">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="mb-4 rounded-full"
          />
          <h2 className="mb-2 text-xl font-bold">{profileInfo.name}</h2>
          <p className="text-gray-600">{profileInfo.email}</p>
        </div>
        <form class="w-full p-6 md:w-3/4" onSubmit={handleSubmit}>
          <div className="w-full p-6 md:w-3/4">
            <div className="flex flex-col space-y-4">
              <h2 className="mb-4 text-2xl font-bold">Update Product</h2>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full px-2 md:w-1/2">
                  <label className="block mb-2">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    className="w-full p-2 border rounded"
                    value={productData.productName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <label className="block mb-2">Product Category</label>

                  <select
                    name="productCategory"
                    value={productData.productCategory}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option
                      value=""
                      class="block px-4 py-2 text-sm text-gray-700"
                    >
                      Select
                    </option>
                    <option
                      value="ELECTRONIC_ACCESSORIES"
                      class="block px-4 py-2 text-sm text-gray-700"
                    >
                      ELECTRONIC_ACCESSORIES
                    </option>
                    <option
                      value="HOME_APPLIANCES"
                      class="block px-4 py-2 text-sm text-gray-700"
                    >
                      HOME_APPLIANCES
                    </option>
                    <option
                      value="other"
                      class="block px-4 py-2 text-sm text-gray-700"
                    >
                      Other
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap -mx-2">
                <div className="w-full px-2 md:w-1/2">
                  <label className="block mb-2">Qty</label>
                  <input
                    type="number"
                    name="productStock"
                    className="w-full p-2 border rounded "
                    value={productData.productStock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <label className="block mb-2">Price</label>
                  <input
                    type="number"
                    name="productPrice"
                    className="w-full p-2 border rounded"
                    value={productData.productPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <br />
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Update Product
            </button>
            <button
              type="button"
              onClick={() => deleteProduct(productID)}
              class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-900 focus:outline-none dark:focus:ring-blue-800"
            >
              Delete Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
