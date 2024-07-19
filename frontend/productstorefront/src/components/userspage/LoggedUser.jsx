import { useEffect, useState } from "react";
import Contents from "./Contents";
import { UserService } from "../service/UserService";

export default function LoggedUser() {
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
    <div>
      <Contents profileInfo={profileInfo} />
    </div>
  );
}
