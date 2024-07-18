import { useEffect, useState } from "react";
import { UserService } from "../service/UserService";
import { Link } from "react-router-dom";

export default function Profile() {
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
    <div className="profile-page-container">
      <h2>Profile Information</h2>
      <p>Name: {profileInfo.name}</p>
      <p>Email: {profileInfo.email}</p>
      {profileInfo.role === "ADMIN" && (
        <button>
          <Link to={`/update-user/${profileInfo.id}`}>Update This Profile</Link>
        </button>
      )}
    </div>
  );
}
