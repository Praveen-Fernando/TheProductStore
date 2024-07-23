import { useEffect, useState } from "react";
import { UserService } from "../service/UserService";
import AuthenticatedHeader from "../common/AuthenticatedHeader";
import PublicHeader from "../common/PublicHeader";

const Authentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [_, setTick] = useState(0); // _ is unused, setTick triggers a re-render

  const forceRerender = () => {
    setTick((tick) => tick + 1); // Update state to force re-render
  };

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

// const [isAuthenticated, setIsAuthenticated] = useState(false);
// const [userRole, setUserRole] = useState(null);

// useEffect(() => {
//   // Check if the user is authenticated initially
//   setIsAuthenticated(UserService.isAuthenticated());
//   const authState = localStorage.getItem("isAuthenticated");
//   const role = localStorage.getItem("role");
//   if (authState) {
//     setIsAuthenticated(JSON.parse(authState));
//     if (role) {
//       setUserRole(role);
//     }
//   }
// }, []);

// useEffect(() => {
//   // Update local storage when authentication state or user role changes
//   localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
//   localStorage.setItem("role", userRole);
// }, [isAuthenticated, userRole]);

// const handleLogin = (role) => {
//   setIsAuthenticated(true);
//   setUserRole(role);
// };

// const handleLogout = () => {
//   const logout = window.confirm("Are you Sure?");
//   if (logout) {
//     UserService.logout();
//     console.log("button was clicked");
//   }
//   setIsAuthenticated(false);
// };
