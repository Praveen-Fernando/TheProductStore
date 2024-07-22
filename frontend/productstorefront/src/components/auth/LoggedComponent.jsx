import { useEffect, useRef, useState } from "react";
import { UserService } from "../service/UserService";
import { Link } from "react-router-dom";

export default function LoggedComponent({ onLogout }) {
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
    <div>
      <div class="relative" ref={dropdownRef}>
        <div class="flex items-center cursor-pointer" onClick={toggleDropdown}>
          <img
            class="w-8 h-8 rounded-full"
            src="src/images/man.png"
            alt="user photo"
          />
        </div>
        {isDropdownOpen && (
          <div class="absolute right-0 w-48 mt-2 text-black bg-white border border-gray-200 rounded shadow-lg z-10">
            <Link to="/LoggedUser">
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                Settings
              </a>
            </Link>
            <Link to="/">
              <a
                href="#"
                onClick={onLogout}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
