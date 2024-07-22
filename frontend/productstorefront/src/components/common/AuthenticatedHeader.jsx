import { Link, useSearchParams } from "react-router-dom";
import { UserService } from "../service/UserService";
import { useEffect, useRef, useState } from "react";

export default function AuthenticatedHeader({ onLogout }) {
  const isAuthenticated = UserService.isAuthenticated();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="" class="h-8" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Product Store
          </span>
        </a>

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              class="w-8 h-8 rounded-full"
              src="src/images/man.png"
              alt="user photo"
            />
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 w-48 mt-2 text-black bg-white border border-gray-200 rounded shadow-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Settings
              </a>
              {isAuthenticated && (
                <Link to="/">
                  <a
                    href="#"
                    onClick={onLogout}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
