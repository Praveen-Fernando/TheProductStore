import Authentication from "../../auth/Authentication";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainSideBar from "./MainSideBar";
import { UserService } from "../../service/UserService";

export default function Profile() {
  const { profileInfo } = Authentication();
  const navigate = useNavigate();
  //const {token } = useParams();
  const token = localStorage.getItem("token");

  const deleteUser = async (user_id) => {
    try {
      // Prompt for confirmation before deleting the user
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        const token = localStorage.getItem("token");
        await UserService.deleteUser(token);
        window.location.reload();
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div class="max-w-screen-xl items-center  mx-auto p-4">
      <div className="flex flex-col p-4 lg:flex-row">
        <MainSideBar />
        <div className="w-full p-4 bg-white rounded-lg shadow-lg lg:w-3/4">
          <div className="">
            <div className="flex justify-between p-0 bg-white ">
              <h2 className="mb-4 text-2xl font-bold">Edit Profile</h2>
            </div>
            <div class="gap-4">
              <form class="w-full p-6 md:w-3/4" onSubmit={handleSubmit}>
                <div className="w-full p-6 md:w-3/4">
                  <div className="flex flex-col space-y-4">
                    <h2 className="mb-4 text-2xl font-bold">
                      Profile Settings
                    </h2>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full px-2 md:w-1/2">
                        <label className="block mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          className="w-full p-2 border rounded"
                          value={userData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-full px-2 md:w-1/2">
                        <label className="block mb-2">Email Name</label>
                        <input
                          type="email"
                          name="email"
                          className="w-full p-2 border rounded "
                          value={userData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full px-2 md:w-1/2">
                        <label className="block mb-2">Phone Number</label>
                        <input
                          type="text"
                          name="contact"
                          className="w-full p-2 border rounded"
                          value={userData.contact}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-full px-2 md:w-1/2">
                        <label className="block mb-2">Gender</label>

                        <select
                          name="gender"
                          value={userData.gender}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                          required
                        >
                          <option
                            value=""
                            class="block px-4 py-2 text-sm text-gray-700"
                          >
                            Select
                          </option>
                          <option
                            value="male"
                            class="block px-4 py-2 text-sm text-gray-700"
                          >
                            Male
                          </option>
                          <option
                            value="female"
                            class="block px-4 py-2 text-sm text-gray-700"
                          >
                            Female
                          </option>
                          <option
                            value="other"
                            class="block px-4 py-2 text-sm text-gray-700"
                          >
                            Other
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full px-2 md:w-1/2">
                        <label className="block mb-2">Address</label>
                        <input
                          type="text"
                          name="address"
                          className="w-full p-2 border rounded"
                          value={userData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-full px-2 md:w-1/2">
                        <label className="block mb-2">Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          className="w-full p-2 border rounded"
                          value={userData.dob}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
