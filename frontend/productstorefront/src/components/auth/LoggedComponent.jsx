import { useEffect, useRef, useState } from "react";
import { UserService } from "../service/UserService";
import { Link } from "react-router-dom";
import Authentication from "./Authentication";

export default function LoggedComponent() {
  const { handleLogout, profileInfo } = Authentication();
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
    <div class="pr-2">
      <div class="relative pr-25" ref={dropdownRef}>
        <div class="flex items-center cursor-pointer" onClick={toggleDropdown}>
          <img
            class="w-8 h-8 rounded-full"
            src="src/images/man.png"
            alt="user photo"
          />
        </div>
        {isDropdownOpen && (
          <div class="absolute right-0 w-48 mt-2 text-black bg-white border border-gray-200 rounded shadow-lg z-10">
            <div class="border-b-2 border-gray-300">
              <a class="block px-4 py-2 hover:bg-gray-100 text-sm pb-0">
                {profileInfo.name}
              </a>
              <a class="block px-4 py-2 hover:bg-gray-100 text-sm pt-0">
                {profileInfo.email}
              </a>
            </div>

            <Link to="/LoggedUser">
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                Profile
              </a>
            </Link>
            <Link to="/">
              <a
                href="#"
                onClick={handleLogout}
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
