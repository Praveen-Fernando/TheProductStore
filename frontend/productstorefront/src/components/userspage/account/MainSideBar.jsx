import { useState } from "react";
import Authentication from "../../auth/Authentication";
import { UserService } from "../../service/UserService";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MainSideBar() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { profileInfo } = Authentication();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div class="">
      <div className="">
        <div class="flex justify-between">
          <div className="mb-4 text-left lg:hidden">
            <h2 className="text-xl font-bold ">Hello, {profileInfo.name}</h2>
            {UserService.isSeller() ? (
              <div>
                <p className="inline-block px-3 py-1 mt-2 text-white bg-green-600 rounded-full">
                  Verified Seller Account
                </p>
              </div>
            ) : (
              <div>
                <p className="inline-block px-3 py-1 mt-2 text-white bg-green-600 rounded-full">
                  Verified Account
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end mb-4 lg:hidden h-fit">
            <button
              onClick={toggleSidebar}
              className="p-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
            >
              {isSidebarVisible ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`w-full  bg-white rounded-lg shadow-lg p-4 lg:mr-4 mb-4 lg:mb-0 ${
            isSidebarVisible ? "block" : "hidden"
          } lg:block`}
        >
          <div className="hidden mb-4 text-left lg:block">
            <h2 className="text-xl font-bold">Hello, {profileInfo.name}</h2>
            {UserService.isSeller() ? (
              <div>
                <p className="inline-block px-3 py-1 mt-2 text-white bg-green-600 rounded-full">
                  Verified Seller Account
                </p>
              </div>
            ) : (
              <div>
                <p className="inline-block px-3 py-1 mt-2 text-white bg-green-600 rounded-full">
                  Verified Account
                </p>
              </div>
            )}
          </div>
          <ul className="space-y-2">
            <li>
              <h1 class="font-bold pt-3">Account</h1>
            </li>
            <li>
              <Link to={"/profile"}>
                <a href="#" className="block p-2 rounded hover:bg-gray-200">
                  My Profile
                </a>
              </Link>
            </li>
            <li>
              <Link to={"/manageprofile"}>
                <a href="#" className="block p-2 rounded hover:bg-gray-200">
                  Manage Profile
                </a>
              </Link>
            </li>

            {/* Buyer View*/}
            {UserService.buyerOnly() && (
              <>
                <li>
                  <Link to={"/points"}>
                    <a href="#" className="block p-2 rounded hover:bg-gray-200">
                      Points
                    </a>
                  </Link>
                </li>
                <li>
                  <h1 class="font-bold pt-3">My Order</h1>
                </li>

                <li>
                  <Link to={"/myRecentOrders"}>
                    <a href="#" className="block p-2 rounded hover:bg-gray-200">
                      My Orders
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to={"/myReturns"}>
                    <a href="#" className="block p-2 rounded hover:bg-gray-200">
                      My Returns
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to={"/myReviews"}>
                    <a href="#" className="block p-2 rounded hover:bg-gray-200">
                      My Reviews
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to={"/myWishlist"}>
                    <a href="#" className="block p-2 rounded hover:bg-gray-200">
                      My Wishlist
                    </a>
                  </Link>
                </li>
              </>
            )}

            {/* Seller View*/}
            {UserService.sellerOnly() && (
              <>
                <li>
                  <h1 class="font-bold pt-3">Store Management</h1>
                </li>
                <li>
                  <Link to={"/productStore"}>
                    <a href="#" className="block p-2 rounded hover:bg-gray-200">
                      Products Store
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to={"/recentOrders"}>
                    <a href="#" className="block p-2 rounded hover:bg-gray-200">
                      Recent Order
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to={"/clientReturns"}>
                    <a href="#" className="block p-2 rounded hover:bg-gray-200">
                      Client Returns
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to={"/clientReviews"}>
                    <a href="#" className="block p-2 rounded hover:bg-gray-200">
                      Client Reviews
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
