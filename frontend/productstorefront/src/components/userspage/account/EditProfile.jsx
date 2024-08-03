import { useNavigate, useParams } from "react-router-dom";
import Authentication from "../../auth/Authentication";
import { UserService } from "../../service/UserService";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import {
  TopRightAlertContext,
  options,
} from "../../sub-components/AlertProviderWrapper";

export default function EditProfile() {
  const { profileInfo } = Authentication();
  const navigate = useNavigate();
  const { token } = useParams();
  const [error, setError] = useState(null);
  const [timestamp, setTimestamp] = useState(Date.now());
  const alert = useAlert();
  const topRightAlert = useAlert(TopRightAlertContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact: "",
    dob: "",
    gender: "",
    address: "",
  });

  const fetchUser = async (token) => {
    try {
      const response = await UserService.getUserByToken(token);
      const { name, email, role, contact, dob, gender, address } =
        response.user;

      setUserData({ name, email, role, contact, dob, gender, address });
      console.log(userData);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err.message);
      navigate("/Unauthorized");
      window.location.reload();
    }
  };

  useEffect(() => {
    fetchUser(token);
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to Update your Details?"
      );

      if (confirmUpdate) {
        //const token = localStorage.getItem("token");
        const res = await UserService.updateUserByToken(userData, token);
        console.log(res);
        // Redirect to profile page or display a success message
        navigate("/profile");
        updateAlert();
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert(error);
    }
  };

  const updateAlert = () => {
    topRightAlert.show("Profile Updated!", options);
  };

  return (
    <div class="flex justify-center items-center p-4">
      <div class="flex flex-col w-full max-w-6xl bg-white rounded-lg shadow-lg md:flex-row">
        <div className="flex flex-col items-center w-full p-4 border-b md:w-1/4 md:border-b-0 md:border-r">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="mb-4 rounded-full"
          />
          <h2 className="mb-2 text-xl font-bold">{profileInfo.name}</h2>
          <p className="text-gray-600">{profileInfo.email}</p>
        </div>
        <form class="w-full p-6 md:w-3/4" onSubmit={handleSubmit}>
          <div className="w-full p-6 md:w-3/4">
            <div className="flex flex-col space-y-4">
              <h2 className="mb-4 text-2xl font-bold">Profile Settings</h2>
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
  );
}
