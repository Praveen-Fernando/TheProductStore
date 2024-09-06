import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Authentication from "../../auth/Authentication";
import { ProductService } from "../../service/ProductService";

export default function EditProduct() {
  const { profileInfo } = Authentication();
  const navigate = useNavigate();
  const { productID } = useParams();
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productBrands, setproductBrands] = useState([]);
  const [selectedBrand, setselectedBrand] = useState("");
  const [productStatus, setproductStatus] = useState([]);
  const [selectedStatus, setselectedStatus] = useState("");

  const [productData, setProductData] = useState({
    productName: "",
    productStock: "",
    productPrice: "",
    productCategory: "",
    productDescription: "",
    productBrand: "",
    productStatus: "",
    productImages: [],
  });

  useEffect(() => {}, []);

  useEffect(() => {
    fetchproductById(productID);
  }, [productID]);

  const fetchproductById = async (productID) => {
    try {
      const token = localStorage.getItem("token");
      const product = await ProductService.getProductById(productID, token);
      const {
        productName,
        productPrice,
        productCategory,
        productDescription,
        productAddedDate,
        productStock,
        productBrand,
        productStatus,
        sellerEmail,
        productImages: [],
      } = product;
      console.log(product);

      setProductData({
        productName,
        productStock,
        productPrice,
        productCategory,
        productAddedDate,
        productDescription,
        productBrand,
        productStatus,
        sellerEmail,
        productImages: [],
      });
      console.log("Product data :" + productData);
    } catch (err) {
      console.error("Error fetching product data:", err);
      //window.location.reload();
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevProductData) => ({
      ...prevProductData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setSelectedCategory(value);
  };
  const handleBrandChange = (e) => {
    const { value } = e.target;
    setselectedBrand(value);
  };

  const handleStatushange = (e) => {
    const { value } = e.target;
    setselectedStatus(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to Update this Product details?"
      );

      if (confirmUpdate) {
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("productName", productData.productName);
        formData.append("productStock", productData.productStock);
        formData.append("productPrice", productData.productPrice);
        formData.append("productDescription", productData.productDescription);
        formData.append(
          "productBrand",
          selectedBrand ? selectedBrand : productData.productBrand
        );
        formData.append(
          "productCategory",
          selectedCategory ? selectedCategory : productData.productCategory
        );
        formData.append(
          "productStatus",
          selectedStatus ? selectedStatus : productData.productStatus
        );
        console.log("formData :" + formData);

        const res = await ProductService.updateProduct(
          productID,
          formData,
          token
        );
        console.log(res);
        // Redirect to profile page or display a success message
        navigate("/productStore");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert(error);
    }
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
      }
    } catch (error) {
      console.error("Error deleting user:", error);
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
                  <label className="block mb-2">Qty</label>
                  <input
                    type="number"
                    name="productStock"
                    className="w-full p-2 border rounded"
                    value={productData.productStock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-2">
                <div className="w-full px-2 md:w-1/2">
                  <label className="block mb-2">Product Category</label>
                  <select
                    value={
                      selectedCategory
                        ? selectedCategory
                        : productData.productCategory
                    }
                    onChange={handleCategoryChange}
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
                    value={
                      selectedBrand ? selectedBrand : productData.productBrand
                    }
                    onChange={handleBrandChange}
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
                    value={productData.productPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <label className="block mb-2">Product Status</label>
                  <select
                    value={
                      selectedStatus
                        ? selectedStatus
                        : productData.productStatus
                    }
                    onChange={handleStatushange}
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
                  value={productData.productDescription}
                  onChange={(e) => {
                    handleInputChange(e);
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  required
                  rows="2"
                />
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
