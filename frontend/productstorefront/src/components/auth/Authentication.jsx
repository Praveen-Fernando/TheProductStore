import { useEffect, useState } from "react";
import { UserService } from "../service/UserService";

const Authentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  return { isAuthenticated, handleLogin, handleLogout };
};

export default Authentication;
