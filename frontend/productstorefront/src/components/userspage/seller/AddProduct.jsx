import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Authentication from "../../auth/Authentication";
import { ProductService } from "../../service/ProductService";
import { useAlert } from "react-alert";
import {
  TopRightAlertContext,
  options,
} from "../../sub-components/AlertProviderWrapper";

export default function AddProduct() {
  const { profileInfo } = Authentication();
  const navigate = useNavigate();
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productBrands, setproductBrands] = useState([]);
  const [selectedBrand, setselectedBrand] = useState("");
  const [productStatus, setproductStatus] = useState([]);
  const [selectedStatus, setselectedStatus] = useState("");
  const alert = useAlert();
  const topRightAlert = useAlert(TopRightAlertContext);
  const [productformData, setProductFormData] = useState({
    productName: "",
    productStock: "",
    productPrice: "",
    productCategory: "",
    productDescription: "",
    productBrand: "",
    productStatus: "",
    files: [],
  });
  console.log(productCategories);

  /* Fetch Categories */
  useEffect(() => {
    fetchproductCategories();
  }, []);

  const fetchproductCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const categories = await ProductService.getProductCategoryTypes(token);
      setProductCategories(categories);
    } catch (error) {
      console.log("Error fetching Product Categories" + error);
    }
  };

  /* Fetch Brands */
  useEffect(() => {
    fetchproductBrands();
  }, []);

  const fetchproductBrands = async () => {
    try {
      const token = localStorage.getItem("token");
      const brands = await ProductService.getProductBrands(token);
      setproductBrands(brands);
    } catch (error) {
      console.log("Error fetching Product Categories" + error);
    }
  };

  /* Fetch Status */
  useEffect(() => {
    fetchproductStatus();
  }, []);

  const fetchproductStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const status = await ProductService.getProductStatus(token);
      setproductStatus(status);
    } catch (error) {
      console.log("Error fetching Product Categories" + error);
    }
  };

  useEffect(() => {
    setProductFormData((prevData) => ({
      ...prevData,
    }));
  }, [profileInfo]);

  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);
    setProductFormData((prevData) => ({
      ...prevData,
      files: fileList,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductFormData({ ...productformData, [name]: value });
  };

  /*Handle product form */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("productName", productformData.productName);
      formData.append("productStock", productformData.productStock);
      formData.append("productPrice", productformData.productPrice);
      formData.append("productDescription", productformData.productDescription);
      formData.append("productBrand", selectedBrand);
      formData.append("productCategory", selectedCategory);
      formData.append("productStatus", selectedStatus);

      productformData.files.forEach((file) => {
        formData.append("files", file);
      });

      //formData.append("mainImage", mainImg ? mainImg.name : "");

      await ProductService.addProduct(formData, token);
      navigate("/productStore");
      insertAlert();
    } catch (error) {
      console.log("Error Adding product: " + error);
      alert("An error occurred while adding the product");
    }
  };

  const insertAlert = () => {
    topRightAlert.show("Product Added!", options);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-6xl bg-white rounded-lg shadow-lg md:flex-row">
        <div className="flex flex-col items-center w-full p-4 border-b md:w-1/4 md:border-b-0 md:border-r">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="mb-4 rounded-full"
          />
          <h2 className="mb-2 text-xl font-bold">{profileInfo.name}</h2>
          <p className="text-gray-600">{profileInfo.email}</p>
        </div>
        <form className="w-full p-6 md:w-3/4" onSubmit={handleSubmit}>
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
                  <label className="block mb-2">Qty</label>
                  <input
                    type="number"
                    name="productStock"
                    className="w-full p-2 border rounded"
                    value={productformData.productStock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-2">
                <div className="w-full px-2 md:w-1/2">
                  <label className="block mb-2">Product Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="" disabled>
                      Select a Category
                    </option>
                    {productCategories.map((productCategory, index) => (
                      <option key={index} value={productCategory}>
                        {productCategory}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <label className="block mb-2">Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setselectedBrand(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="" disabled>
                      Select a Brand
                    </option>
                    {productBrands.map((brand, index) => (
                      <option key={index} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap -mx-2">
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
                <div className="w-full px-2 md:w-1/2">
                  <label className="block mb-2">Product Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setselectedStatus(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    {productStatus.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4"></div>
              <div className="mt-4">
                <label className="block mb-2">Product Description</label>
                <textarea
                  name="productDescription"
                  className="w-full p-2 overflow-hidden border rounded resize-none"
                  value={productformData.productDescription}
                  onChange={(e) => {
                    handleInputChange(e);
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  required
                  rows="1"
                />
              </div>

              <div className="mt-4">
                <label className="block mb-2">Product Images</label>
                <input
                  type="file"
                  name="files"
                  className="w-full p-2 border rounded"
                  onChange={handleImageChange}
                  multiple
                />
              </div>

              <h2>Images Preview</h2>
              <div className="grid grid-cols-4 ">
                {productformData.files.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Product Image ${index + 1}`}
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <br />
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
