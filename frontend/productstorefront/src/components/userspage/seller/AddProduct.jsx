import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Authentication from "../../auth/Authentication";
import { ProductService } from "../../service/ProductService";

export default function AddProduct() {
  const { profileInfo } = Authentication();
  const navigate = useNavigate();
  const currenttime = new Date().toISOString();

  useEffect(() => {
    // Fetch the user profile email and set it in the state
    const email = profileInfo.email;
    setProductFormData((prevData) => ({
      ...prevData,
      sellerEmail: email,
    }));
  }, []);

  const [productformData, setProductFormData] = useState({
    productName: "",
    productStock: "",
    productPrice: "",
    productCategory: "",
    productAddedDate: currenttime,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductFormData({ ...productformData, [name]: value });
    console.log(productformData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      await ProductService.addProduct(productformData, token);
      alert("Product Added");
      navigate("/productStore");

      setProductFormData({
        productName: "",
        productStock: "",
        productPrice: "",
        productCategory: "",
        productAddedDate: "",
        sellerEmail: "",
      });

      //clear form after submit
    } catch (error) {
      console.log("Error Adding product: " + error);
      alert("A error occurred while adding the product");
      window.location.reload();
    }
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
              <h2 className="mb-4 text-2xl font-bold">Add Product</h2>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full px-2 md:w-1/2">
                  <label className="block mb-2">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    className="w-full p-2 border rounded"
                    value={productformData.productName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <label className="block mb-2">Product Category</label>

                  <select
                    name="productCategory"
                    value={productformData.productCategory}
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
                    value={productformData.productStock}
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
                    value={productformData.productPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <br />
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
