import { useState } from "react";
import Profile from "./Profile";
import ManageProfile from "./ManageProfile";
import Points from "./Points";
import Authentication from "../auth/Authentication";

export default function Contents() {
  const [content, setContent] = useState(<ManageProfile />);
  const { profileInfo } = Authentication();

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div>
      <div class="max-w-screen-xl flex flex-wrap items-center  mx-auto p-4">
        <div class="grid grid-flow-col-1">
          <span class="ms-3 text-sm">Hello, {profileInfo.name}</span>
          <img
            class="p-0 float-right m-4 border-spacing-0  h-3/6 w-7/12"
            src="src/images/verified-user.png"
            alt="user photo"
          />
        </div>

        <ul class="w-full md:grid-cols-2 flex mb-4 gap-6">
          <li className="h-full text-center bg-gray-500 sm:text-left">
            <div class="h-full px-5 py-4 overflow-y-auto bg-gray-50 ">
              <ul class="space-y-2 font-medium ">
                <li>
                  <a
                    href="#"
                    onClick={() => handleContentChange(<Profile />)}
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:text-gray-500  group"
                  >
                    <span class="ms-3">My Profile</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleContentChange(<ManageProfile />)}
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:text-gray-500  group"
                  >
                    <span class="ms-3">Manage Profile</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleContentChange(<Points />)}
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:text-gray-500  group"
                  >
                    <span class="ms-3">Points</span>
                  </a>
                </li>{" "}
                <li>
                  <a
                    href="#"
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:text-gray-500  group"
                  >
                    <span class="ms-3">My Orders</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:text-gray-500  group"
                  >
                    <span class="ms-3">My Returns</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:text-gray-500  group"
                  >
                    <span class="ms-3">My Reviews</span>
                  </a>
                </li>{" "}
                <li>
                  <a
                    href="#"
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:text-gray-500  group"
                  >
                    <span class="ms-3">My Wishlist</span>
                  </a>
                </li>{" "}
              </ul>
            </div>
          </li>
          <li className="w-3/4 h-full ">
            <div>
              <p>{content}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
