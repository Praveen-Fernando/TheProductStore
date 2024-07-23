import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Authentication from "../auth/Authentication";

export default function AuthenticatedHeader() {
  const { isAuthenticated, handleLogout, profileInfo } = Authentication();

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
              <div class="border-b-2 border-gray-300">
                <a class="block px-4 py-2 hover:bg-gray-100 text-sm pb-0">
                  {profileInfo.name}
                </a>
                <a class="block px-4 py-2 hover:bg-gray-100 text-sm pt-0">
                  {profileInfo.email}
                </a>
              </div>
              <Link to="/home">
                <a
                  href="/LoggedUser"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </a>
              </Link>

              {isAuthenticated && (
                <Link to="/home">
                  <a
                    href="#"
                    onClick={handleLogout}
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
