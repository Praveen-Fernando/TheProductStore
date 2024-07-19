import { useEffect, useState } from "react";
import { UserService } from "../service/UserService";

export default function ManageProfile() {
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getUserProfile(token);
      setProfileInfo(response.user);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  return (
    <div class="gap-4">
      <h1 class=" text-left text-lg font-extrabold text-black-900 dark:text-black">
        Manage Profile
      </h1>
      <br />
      <div class="grid grid-cols-2 gap-4 place-content-stretch h-48">
        <div class="border bottom-3 p-2">
          {" "}
          <h3 class=" text-left text-lg font-extrabold text-black-900 dark:text-black">
            Personal Profile{"    "}
            <a href="#" class="font-light text-base text">
              |Edit
            </a>
          </h3>
          <p class="my-4">{profileInfo.name}</p>
          <p class="my-4">{profileInfo.email}</p>
        </div>
        <div class="border bottom-3 p-2">
          {" "}
          <h3 class="text-left text-lg font-extrabold text-black-900 dark:text-black">
            Address Book{"    "}
            <a href="#" class="font-light text-base">
              |Edit
            </a>
          </h3>
          <p class="my-4 text-xs">DEFAULT DELIVERY ADDRESS</p>
          <p class="my-4">{profileInfo.name}</p>
          <p class="my-4">{profileInfo.contact}</p>
        </div>
      </div>
      <br />
      <div class="grid grid-cols-1 gap-4 place-content-stretch h-48 border bottom-3 p-2">
        <h3 class="text-left text-lg font-extrabold text-black-900 dark:text-black">
          Recent Orders
        </h3>

        <table class="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 table-auto">
          <thead class="text-xs text-black font-bold uppercase   ">
            <tr>
              <th scope="col" class="px-6 py-3">
                Order #
              </th>
              <th scope="col" class="px-6 py-3">
                Placed On
              </th>
              <th scope="col" class="px-6 py-3">
                Item
              </th>
              <th scope="col" class="px-6 py-3">
                Amount
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:border-gray-700 ">
              <th
                scope="row"
                class="flex items-center px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-black"
              >
                <div class="py-4">
                  <div class="text-base font-semibold">Bonnie Green</div>
                </div>
              </th>
              <td class="px-6 py-4">Designer</td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <img
                    class="w-10 h-10"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="Jese image"
                  />
                </div>
              </td>
              <td class="px-6 py-4">Designer</td>

              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Manage
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
