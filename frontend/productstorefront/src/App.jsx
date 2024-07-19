import "./App.css";
import Login from "./components/auth/Login";
import Navbar from "./components/common/AuthenticatedHeader";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserService } from "./components/service/UserService";
import Registration from "./components/auth/Registration";
import UserManagement from "./components/userspage/UserManagement";
import Footer from "./components/common/PublicFooter";
import Profile from "./components/userspage/Profile";
import UpdateUser from "./components/userspage/UpdateUser";
import Header from "./components/common/PublicHeader";
import NavDropdown from "./components/common/NavDropdown";
import PublicHeader from "./components/common/PublicHeader";
import { useEffect, useState } from "react";
import PublicFooter from "./components/common/PublicFooter";
import AuthenticatedHeader from "./components/common/AuthenticatedHeader";
import AuthenticatedFooter from "./components/common/AuthenticatedFooter";
import Content from "./components/userspage/Content";
import Home from "./components/userspage/Home";
import AboutUs from "./components/userspage/AboutUs";
import ContactUs from "./components/userspage/ContactUs";
import SellerRegistration from "./components/auth/SellerRegistration";
import LoggedUser from "./components/userspage/LoggedUser";
import ManageProfile from "./components/userspage/ManageProfile";
import Points from "./components/userspage/Points";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated initially
    setIsAuthenticated(UserService.isAuthenticated());
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    const logout = window.confirm("Are you Sure?");
    if (logout) {
      UserService.logout();
    }
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        {isAuthenticated ? (
          <div>
            <AuthenticatedHeader onLogout={handleLogout} />
          </div>
        ) : (
          <div>
            <PublicHeader />
          </div>
        )}
        <div className="content" class="flex flex-col h-screen justify-between">
          <Routes>
            <Route exact path="*" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/aboutus" element={<AboutUs />} />
            <Route exact path="/contactus" element={<ContactUs />} />

            {/* User Account login/Registraion */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Registration />} />

            {/* Seller Registration */}
            <Route path="/sellerregister" element={<SellerRegistration />} />

            {/* User Account  */}
            <Route path="/profile" element={<Profile />} />

            <Route path="/LoggedUser" element={<LoggedUser />} />
            <Route
              path="/LoggedUser/manageprofile"
              element={<ManageProfile />}
            />
            <Route path="/LoggedUser/points" element={<Points />} />

            {UserService.adminOnly() && (
              <>
                <Route
                  path="/admin/user-management"
                  element={<UserManagement />}
                />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
              </>
            )}

            {/* {UserService.buyerOnly() && <></>} */}

            <Route path="/login" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        {isAuthenticated ? <AuthenticatedFooter /> : <PublicFooter />}
      </div>
    </BrowserRouter>
  );
}

export default App;
