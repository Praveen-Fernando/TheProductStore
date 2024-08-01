import { Link } from "react-router-dom";

export default function AuthenticatedFooter() {
  return (
    <footer class="mt-auto bg-white dark:bg-gray-900 ">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://flowbite.com/" class="hover:underline">
            Praveen™
          </a>
          . All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link to="/aboutus" className="hover:underline">
              <a href="#" class="hover:underline me-4 md:me-6">
                About
              </a>
            </Link>
          </li>
          <li>
            <Link to="/Privacy&policy" className="hover:underline">
              <a href="#" class="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </Link>
          </li>
          <li>
            <Link to="/licensing" className="hover:underline">
              <a href="#" class="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </Link>
          </li>
          <li>
            <Link to="/contactus" className="hover:underline">
              <a href="#" class="hover:underline">
                Contact
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
