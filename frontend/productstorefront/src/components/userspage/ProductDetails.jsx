import { useContext, useEffect, useState } from "react";
import { ProductService } from "../service/ProductService";
import { Link, useParams } from "react-router-dom";
import {
  FaTruck,
  FaMoneyBillWave,
  FaSyncAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { CartContext } from "./CartContext";

export default function ProductDetails() {
  //const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const { cart, setCart } = useContext(CartContext);
  const { productID } = useParams();
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

  const handleImageHover = (imageUrl) => {
    setMainImage(imageUrl);
  };

  useEffect(() => {
    fetcProductDetails(productID);
  }, [productID]);

  const fetcProductDetails = async (productID) => {
    try {
      const prodDetails = await ProductService.getSingleProductById(productID);

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
      } = prodDetails;
      console.log(prodDetails.data);

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
      console.log("Product data :" + productData.productID);
    } catch (error) {
      console.log("Product Details Not Fetched : " + error);
    }
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(Number(e.target.value), 1); // Ensure quantity is at least 1
    setQuantity(value);
  };

  const handleAddToCart = () => {
    const productWithQuantity = {
      ...productData, // Keep product details
      quantity, // Attach the current quantity
      productID,
    };

    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.productID === productID);

    if (existingProduct) {
      // If the product exists, update its quantity
      const updatedCart = cart.map((item) =>
        item.productID === productID
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      // If it's a new product, add it to the cart
      setCart([...cart, productWithQuantity]);
    }
  };

  console.log("productWithQuntity : " + productData.data);
  console.log("quantity: " + quantity);

  return (
    <div>
      {/* breadcrumb  */}
      <div className="container flex flex-col p-4 mx-auto md:flex-row ">
        <div>
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li class="inline-flex items-center">
                <Link to="/">
                  <a
                    href="#"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-gray"
                  >
                    <svg
                      class="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <div class="flex items-center">
                  <svg
                    class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <Link to="/productswall">
                    <a
                      href="#"
                      class="ms-1 text-sm font-medium text-gray-700 hover:text-black md:ms-2 dark:text-gray-400 dark:hover:text-gray"
                    >
                      Product Wall
                    </a>
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg
                    class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    {productData.productName}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Product section */}
      <div className="container flex flex-col p-4 mx-auto md:flex-row ">
        {/* Left section for product images */}
        <div className="w-full p-4 md:w-1/2">
          {/* Main image */}
          <img
            src="src/images/Sample-Product.png"
            alt={productData.productName}
            className="w-full h-auto"
          />
        </div>

        {/* Right section for product details */}
        <div className="w-full p-4 md:w-1/2">
          {/* Product Name */}
          <h1 className="mb-2 text-2xl font-bold">{productData.productName}</h1>

          {/* Ratings */}
          <p className="mb-2 text-yellow-500">★★★★★ Ratings</p>

          {/* Price */}
          <div className="mb-2 text-3xl font-bold text-red-500">
            Rs. {productData.productPrice}
          </div>
          {/* <div className="text-lg text-gray-500 line-through">
              Rs. {product.originalPrice}
            </div> */}

          {/* Promotions */}
          <div className="my-2 text-sm text-orange-600">Min. spend Rs. 599</div>

          {/* Color Family
            <div className="my-4">
              <span className="font-semibold text-gray-600">
                Color Family:{" "}
              </span>
              <span className="px-2 py-1 text-gray-800 bg-gray-100 rounded">
                {product.colorFamily}
              </span>
            </div> */}

          {/* Quantity */}
          <div className="flex items-center my-4">
            <span className="mr-4 font-semibold text-gray-600">Quantity:</span>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="px-2 py-1 border rounded"
            />
          </div>

          {/* Buy Now and Add to Cart buttons */}
          <div className="flex my-4 space-x-4">
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
            >
              Add to Cart
            </button>
          </div>

          {/* Delivery Options */}
          <div className="my-4">
            <p className="text-gray-600">
              <FaTruck className="inline-block mr-2" /> Standard Delivery:
              Rs.500
            </p>
          </div>

          {/* Return & Warranty */}
          <div className="my-4">
            <p className="text-gray-600">
              <FaSyncAlt className="inline-block mr-2" /> 14 days easy return
            </p>
            <p className="text-gray-600">
              <FaShieldAlt className="inline-block mr-2" /> 6 months seller
              warranty
            </p>
          </div>

          {/* Promotions */}
          <div className="my-4">
            <p className="text-orange-500">
              <FaMoneyBillWave className="inline-block mr-2" /> Pay up to 3
              months with installment options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
