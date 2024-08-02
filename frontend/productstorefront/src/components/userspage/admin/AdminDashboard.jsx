export default function AdminDashboard() {
  return (
    <div className="flex-grow p-4 bg-gray-100">
      <h2 className="mb-4 text-2xl font-bold">Admin Dashboard</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 text-white bg-red-500 rounded-lg shadow-md">
          <h2 className="text-2xl">5 Users</h2>
          <button className="px-4 py-2 mt-2 bg-red-700 rounded">
            Show Users
          </button>
        </div>
        <div className="p-4 text-white bg-green-500 rounded-lg shadow-md">
          <h2 className="text-2xl">2 Rooms</h2>
          <button className="px-4 py-2 mt-2 bg-green-700 rounded">
            Show Rooms
          </button>
        </div>
        <div className="p-4 text-white bg-yellow-500 rounded-lg shadow-md">
          <h2 className="text-2xl">1195 Sessions</h2>
          <button className="px-4 py-2 mt-2 bg-yellow-700 rounded">
            Show Sessions
          </button>
        </div>
        <div className="p-4 text-white bg-blue-500 rounded-lg shadow-md">
          <h2 className="text-2xl">406h 34m Session Time</h2>
          <button className="px-4 py-2 mt-2 bg-blue-700 rounded">
            Show Sessions
          </button>
        </div>
      </div>
      <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">
          Sessions In Last 30 Days (UTC+10)
        </h2>
        <div className="mt-2">
          {/* Replace with your chart component */}
          <div className="h-64 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
