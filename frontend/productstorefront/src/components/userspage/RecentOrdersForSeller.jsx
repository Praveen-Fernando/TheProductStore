export default function RecentOrdersForSeller() {
  return (
    <div>
      <div className="p-4 bg-white ">
        <h2 className="mb-4 text-2xl font-bold">Orders</h2>
      </div>
      {/* Recent Orders */}
      <div className="p-4 border rounded-lg">
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
                  Qty
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Bonnie Green</td>
                <td className="px-6 py-4 whitespace-nowrap">Designer</td>
                <td className="px-6 py-4 whitespace-nowrap">Designer</td>
                <td className="px-6 py-4 whitespace-nowrap">Designer</td>
                <td className="px-6 py-4 whitespace-nowrap">Designer</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href="#" className="text-blue-600 hover:underline">
                    {" "}
                    Manage{" "}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
