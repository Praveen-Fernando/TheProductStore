import { useEffect, useState } from "react";
import { UserService } from "../service/UserService";

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
    <div class="gap-4">
      <h1 class=" text-left text-lg font-extrabold text-black-900 dark:text-black">
        My Profile
      </h1>
      <br />
      <div class="grid grid-cols-1 gap-4 place-content-stretch h-48 border bottom-3 p-2">
        <p class="my-4">{profileInfo.name}</p>
        <p class="my-4">{profileInfo.email}</p>
      </div>
    </div>
  );
}
