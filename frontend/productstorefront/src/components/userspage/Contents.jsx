import { useState } from "react";
import Profile from "./Profile";
import ManageProfile from "./ManageProfile";
import Points from "./Points";
import Authentication from "../auth/Authentication";
import RecentOrders from "./RecentOrdersForBuyer";
import { UserService } from "../service/UserService";
import { FaBars, FaTimes } from "react-icons/fa";

import Products from "./Products";
import RecentOrdersForBuyer from "./RecentOrdersForBuyer";
import RecentOrdersForSeller from "./RecentOrdersForSeller";

export default function Contents() {
  const [content, setContent] = useState(<ManageProfile />);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { profileInfo } = Authentication();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div class="max-w-screen-xl items-center  mx-auto p-4">
      <div className="flex flex-col p-4 lg:flex-row">
        <div class="flex justify-between">
          <div className="mb-4 text-left lg:hidden">
            <h2 className="text-xl font-bold ">Hello, {profileInfo.name}</h2>
            <p className="inline-block px-3 py-1 mt-2 text-white bg-green-600 rounded-full">
              Verified Account
            </p>
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
          className={`w-full lg:w-1/4 bg-white rounded-lg shadow-lg p-4 lg:mr-4 mb-4 lg:mb-0 ${
            isSidebarVisible ? "block" : "hidden"
          } lg:block`}
        >
          <div className="hidden mb-4 text-left lg:block">
            <h2 className="text-xl font-bold">Hello, {profileInfo.name}</h2>
            <p className="inline-block px-3 py-1 mt-2 text-white bg-green-600 rounded-full">
              Verified Account
            </p>
          </div>
          <ul className="space-y-2">
            <li>
              <h1 class="font-bold pt-3">Account</h1>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleContentChange(<Profile />)}
                className="block p-2 rounded hover:bg-gray-200"
              >
                My Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleContentChange(<ManageProfile />)}
                className="block p-2 rounded hover:bg-gray-200"
              >
                Manage Profile
              </a>
            </li>

            {/* Buyer View*/}

            {UserService.buyerOnly() && (
              <>
                <li>
                  <a
                    href="#"
                    onClick={() => handleContentChange(<Points />)}
                    className="block p-2 rounded hover:bg-gray-200"
                  >
                    Points
                  </a>
                </li>
                <li>
                  <h1 class="font-bold pt-3">My Order</h1>
                </li>

                <li>
                  <a
                    href="#"
                    onClick={() =>
                      handleContentChange(<RecentOrdersForBuyer />)
                    }
                    className="block p-2 rounded hover:bg-gray-200"
                  >
                    My Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-200">
                    My Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-200">
                    My Reviews
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-200">
                    My Wishlist
                  </a>
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
                  <a
                    href="#"
                    onClick={() => handleContentChange(<Products />)}
                    className="block p-2 rounded hover:bg-gray-200"
                  >
                    Products Store
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() =>
                      handleContentChange(<RecentOrdersForSeller />)
                    }
                    className="block p-2 rounded hover:bg-gray-200"
                  >
                    Recent Order
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-200">
                    Client Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-200">
                    Client Reviews
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full p-4 bg-white rounded-lg shadow-lg lg:w-3/4">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
