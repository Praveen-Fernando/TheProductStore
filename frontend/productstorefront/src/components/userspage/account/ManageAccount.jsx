import { useEffect, useState } from "react";
import MainSideBar from "./MainSideBar";
import { UserService } from "../../service/UserService";

export default function ManageAccount() {
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
    <div class="max-w-screen-xl items-center  mx-auto p-4">
      <div className="flex flex-col p-4 lg:flex-row">
        <MainSideBar />
        <div className="w-full p-4 bg-white rounded-lg shadow-lg lg:w-3/4">
          <div className="">
            {/* Main Content */}
            <div className="p-4 bg-white ">
              <h2 className="mb-4 text-2xl font-bold">Manage Profile</h2>
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                {/* Personal Profile */}
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-2 text-lg font-bold">Personal Profile</h3>
                  <p>
                    <strong>Name:</strong> {profileInfo.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {profileInfo.email}
                  </p>
                </div>

                {/* Address Book */}
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-2 text-lg font-bold">Address Book</h3>
                  <p>
                    <strong>Address:</strong> {profileInfo.address}
                  </p>
                  <p>
                    <strong>Contact:</strong> {profileInfo.contact}
                  </p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="p-4 border rounded-lg">
                <h3 className="mb-2 text-lg font-bold">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Order #
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Placed On
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Item
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          Bonnie Green
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          Designer
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src="https://via.placeholder.com/20"
                            alt="Item"
                            className="inline-block mr-2"
                          />
                          Jese
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          Designer
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a href="#" className="text-blue-600 hover:underline">
                            Manage
                          </a>
                        </td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
