import "./App.css";
import Login from "./components/auth/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserService } from "./components/service/UserService";
import Registration from "./components/auth/Registration";
import UserManagement from "./components/userspage/UserManagement";
import Profile from "./components/userspage/Profile";
import UpdateUser from "./components/userspage/UpdateUser";
import PublicHeader from "./components/common/PublicHeader";
import PublicFooter from "./components/common/PublicFooter";
import AuthenticatedHeader from "./components/common/AuthenticatedHeader";
import AuthenticatedFooter from "./components/common/AuthenticatedFooter";
import Home from "./components/userspage/Home";
import AboutUs from "./components/userspage/AboutUs";
import ContactUs from "./components/userspage/ContactUs";
import SellerRegistration from "./components/auth/SellerRegistration";
import LoggedUser from "./components/userspage/LoggedUser";
import ManageProfile from "./components/userspage/ManageProfile";
import Points from "./components/userspage/Points";
import Authentication from "./components/auth/Authentication";
import EditProfile from "./components/userspage/EditProfile";
import TestComponent from "./components/sub-components/TestComponent";
import Contents from "./components/userspage/Contents";
import NotFound404 from "./components/userspage/NotFound404";
import Unauthorized from "./components/userspage/Unauthorized";

function App() {
  const { isAuthenticated } = Authentication();

  return (
    <BrowserRouter>
      <div>
        {isAuthenticated ? (
          UserService.buyerOnly() ? (
            <PublicHeader />
          ) : (
            <AuthenticatedHeader />
          )
        ) : (
          <PublicHeader />
        )}

        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Unauthorized" element={<Unauthorized />} />
            <Route exact path="/aboutus" element={<AboutUs />} />
            <Route exact path="/contactus" element={<ContactUs />} />
            {/* User Account login/Registraion */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            {/* Seller Registration */}
            <Route path="/sellerregister" element={<SellerRegistration />} />
            {/* User Account  */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-user/:token" element={<EditProfile />} />
            <Route path="/content" element={<Contents />} />
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
                <Route path="/update-user/:userId" element={<EditProfile />} />
              </>
            )}
            {/* {UserService.buyerOnly() && <></>} */}
            <Route path="/login" element={<Navigate to="/login" />} />

            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </div>

        {isAuthenticated ? (
          UserService.buyerOnly() ? (
            <div>
              <PublicFooter />
            </div>
          ) : (
            <div>
              <AuthenticatedFooter />
            </div>
          )
        ) : (
          <div>
            <PublicFooter />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
