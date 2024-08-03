import MainSideBar from "../account/MainSideBar";

export default function SellerRecentOrders() {
  return (
    <div class="max-w-screen-xl items-center  mx-auto p-4">
      <div className="flex flex-col p-4 lg:flex-row">
        <MainSideBar />
        <div className="w-full p-4 bg-white rounded-lg shadow-lg lg:w-3/4">
          <div>
            <div className="p-4 bg-white ">
              <h2 className="mb-4 text-2xl font-bold">Current Orders</h2>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Product #
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Qty
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
                      <td className="px-6 py-4 whitespace-nowrap">Designer</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src="https://via.placeholder.com/20"
                          alt="Item"
                          className="inline-block mr-2"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">Designer</td>
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
  );
}
