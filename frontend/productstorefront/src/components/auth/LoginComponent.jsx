import { Link } from "react-router-dom";

export default function LoginComponent() {
  return (
    <div>
      <div class="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse pr-2">
        <Link to="/login">
          <a
            href="#"
            class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Login
          </a>
        </Link>
        <Link to="/register">
          <a
            href="#"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Sign up
          </a>
        </Link>
      </div>
    </div>
  );
}
