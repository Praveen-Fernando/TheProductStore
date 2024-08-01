import { useEffect, useState } from "react";
import { UserService } from "../service/UserService";
import { ProductService } from "../service/ProductService";

const Authentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    // Check if the user is authenticated initially
    setIsAuthenticated(UserService.isAuthenticated());
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    window.location.reload();
    window.location.href = "/LoggedUser";
  };

  const handleLogout = () => {
    const logout = window.confirm("Are you Sure?");
    if (logout) {
      UserService.logout();
      window.location.reload();
      window.location.href = "/";
    }

    setIsAuthenticated(false);
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  useEffect(() => {
    fetchProductsInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getUserProfile(token);
      setProfileInfo(response.user);
    } catch (error) {
      UserService.logout();
      console.error("Error fetching profile information:", error);
    }
  };

  const fetchProductsInfo = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await ProductService.getAllProducts();
      setProductInfo(response);
    } catch (error) {
      //UserService.logout();
      console.error("Error fetching profile information:", error);
    }
  };

  return {
    isAuthenticated,
    handleLogin,
    handleLogout,
    profileInfo,
    productInfo,
  };
};

export default Authentication;
