import "./App.css";
import Login from "./components/auth/Login";
import Navbar from "./components/common/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserService } from "./components/service/UserService";
import Registration from "./components/auth/Registration";
import UserManagement from "./components/userspage/UserManagement";
import Footer from "./components/common/Footer";
import Profile from "./components/userspage/Profile";
import UpdateUser from "./components/userspage/UpdateUser";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {UserService.adminOnly() && (
              <>
                <Route path="/register" element={<Registration />} />
                <Route
                  path="/admin/user-management"
                  element={<UserManagement />}
                />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/login" />} />‰
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
