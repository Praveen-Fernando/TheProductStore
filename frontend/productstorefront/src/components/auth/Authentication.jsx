import { useEffect, useState } from "react";
import { UserService } from "../service/UserService";

const Authentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    // Check if the user is authenticated initially
    setIsAuthenticated(UserService.isAuthenticated());
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log("Login clicked");
    window.location.reload();
    window.location.href = "/LoggedUser";
  };

  const handleLogout = () => {
    const logout = window.confirm("Are you Sure?");
    if (logout) {
      UserService.logout();
      console.log("button was clicked");
      window.location.reload();
      window.location.href = "/home";
    }

    console.log("button was clicked");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getUserProfile(token);
      setProfileInfo(response.user);
      console.log(response.user);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  return { isAuthenticated, handleLogin, handleLogout, profileInfo };
};

export default Authentication;
