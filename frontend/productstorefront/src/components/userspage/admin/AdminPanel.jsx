import { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaVideo,
  FaTicketAlt,
  FaWarehouse,
  FaCogs,
  FaFileAlt,
  FaTools,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminUserManagement from "./AdminUserManagement";
import AdminSales from "./AdminSales";
import AdminTickets from "./AdminTickets";
import AdminStocks from "./AdminStocks";
import AdminSettings from "./AdminSettings";
import AdminWorkflow from "./AdminWorkflow";
import Authentication from "../../auth/Authentication";

export default function AdminPanel() {
  const { productInfo, handleLogout } = Authentication();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [content, setContent] = useState(<AdminDashboard />);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`bg-gray-800 text-white w-64 h-screen flex flex-col fixed lg:relative transition-transform transform ${
          isSidebarVisible
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="pb-2 bg-gray-900 border-b border-gray-700">
          <div className="flex items-center justify-between h-20 px-4 ">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
              <img
                src="src/images/man.png"
                class="h-8 px-3"
                alt="The Product Store"
              />
            </a>

            <button className="text-white lg:hidden" onClick={toggleSidebar}>
              <FaBars />
            </button>
          </div>
          <div className="px-4 font-bold">
            <h1>Admin Panel</h1>
          </div>
        </div>

        <nav className="flex-grow bg-gray-900">
          <ul>
            <li className="flex-grow px-4 py-2 hover:bg-gray-700">
              <a
                href="#"
                onClick={() => handleContentChange(<AdminDashboard />)}
                class="mt-0"
              >
                <FaTachometerAlt className="inline-block mr-2" />
                Dashboard
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <FaUsers className="inline-block mr-2" />
              <a
                href="#"
                onClick={() => handleContentChange(<AdminUserManagement />)}
                class="mt-0"
              >
                Users
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <FaVideo className="inline-block mr-2" />
              <a
                href="#"
                onClick={() => handleContentChange(<AdminSales />)}
                class="mt-0"
              >
                Sales
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <FaTicketAlt className="inline-block mr-2" />
              <a
                href="#"
                onClick={() => handleContentChange(<AdminTickets />)}
                class="mt-0"
              >
                Tickets
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <FaWarehouse className="inline-block mr-2" />
              <a
                href="#"
                onClick={() => handleContentChange(<AdminStocks />)}
                class="mt-0"
              >
                Stocks
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <FaCogs className="inline-block mr-2" />
              <a
                href="#"
                onClick={() => handleContentChange(<AdminSettings />)}
                class="mt-0"
              >
                Settings
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <FaTools className="inline-block mr-2" />
              <a
                href="#"
                onClick={() => handleContentChange(<AdminWorkflow />)}
                class="mt-0"
              >
                Workflow
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <GrLogout className="inline-block mr-2" />
              <Link to="/">
                <a href="#" onClick={handleLogout} className="">
                  Sign out
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between px-4 py-2 text-white bg-gray-900">
          <div className="flex items-center">
            <FaBars
              className="mr-4 cursor-pointer lg:hidden"
              onClick={toggleSidebar}
            />
            <a
              href="#"
              class="flex items-center space-x-3 rtl:space-x-reverse lg:hi"
            >
              <img
                src="src/images/logo.png"
                class="h-8"
                alt="The Product Store"
              />
            </a>
          </div>
          <div className="items-center space-x-4 lg:flex">
            <span>{productInfo.name}</span>
          </div>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
}
