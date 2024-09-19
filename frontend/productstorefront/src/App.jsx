import "./App.css";
import Login from "./components/auth/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserService } from "./components/service/UserService";
import Registration from "./components/auth/Registration";
import UserManagement from "./components/userspage/UserManagement";
import PublicHeader from "./components/common/PublicHeader";
import PublicFooter from "./components/common/PublicFooter";
import AuthenticatedHeader from "./components/common/AuthenticatedHeader";
import AuthenticatedFooter from "./components/common/AuthenticatedFooter";
import Home from "./components/userspage/Home";
import AboutUs from "./components/userspage/AboutUs";
import ContactUs from "./components/userspage/ContactUs";
import SellerRegistration from "./components/auth/SellerRegistration";
import Authentication from "./components/auth/Authentication";
import NotFound404 from "./components/userspage/NotFound404";
import Unauthorized from "./components/userspage/Unauthorized";
import AddProduct from "./components/userspage/seller/AddProduct";
import AdminPanel from "./components/userspage/admin/AdminPanel";
import ClientReturns from "./components/userspage/account/ClientReturns";
import ClientReviews from "./components/userspage/account/ClientReviews";
import BuyerRecentOrders from "./components/userspage/account/BuyerRecentOrders";
import MyReturns from "./components/userspage/account/MyReturns";
import MyReviews from "./components/userspage/account/MyReviews";
import MyWishlist from "./components/userspage/account/MyWishlist";
import Profile from "./components/userspage/account/Profile";
import ManageAccount from "./components/userspage/account/ManageAccount";
import Points from "./components/userspage/account/Points";
import EditProfile from "./components/userspage/account/EditProfile";
import EditProduct from "./components/userspage/seller/EditProduct";
import ProductStore from "./components/userspage/seller/ProductStore";
import SellerRecentOrders from "./components/userspage/seller/SellerRecentOrders";
import ProductWall from "./components/userspage/ProductWall";
import ProductDetails from "./components/userspage/ProductDetails";
import CartPage from "./components/userspage/Cart";
import { CartProvider } from "./components/userspage/CartContext";

function App() {
  const { isAuthenticated } = Authentication();

  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          {/* Header Section*/}
          {isAuthenticated ? (
            UserService.buyerOnly() ? (
              <PublicHeader />
            ) : UserService.adminOnly() ? (
              ""
            ) : (
              <AuthenticatedHeader />
            )
          ) : (
            <PublicHeader />
          )}

          {/* Body Section*/}
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/Unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound404 />} />
              <Route exact path="/aboutus" element={<AboutUs />} />
              <Route exact path="/contactus" element={<ContactUs />} />
              <Route exact path="/productswall" element={<ProductWall />} />
              <Route
                path="/viewproduct/:productID"
                element={<ProductDetails />}
              />
              <Route path="/cart" element={<CartPage />} />

              {/* User Account login/Registraion */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />

              {/* Seller Registration */}
              <Route path="/sellerregister" element={<SellerRegistration />} />

              {/* User Account  */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/update-user/:token" element={<EditProfile />} />
              <Route path="/manageprofile" element={<ManageAccount />} />
              <Route path="/points" element={<Points />} />
              <Route path="/myRecentOrders" element={<BuyerRecentOrders />} />
              <Route path="/myReturns" element={<MyReturns />} />
              <Route path="/myReviews" element={<MyReviews />} />
              <Route path="/myWishlist" element={<MyWishlist />} />

              {UserService.adminOnly() && (
                <>
                  <Route
                    path="/admin/user-management"
                    element={<UserManagement />}
                  />
                  <Route path="/adminpanel" element={<AdminPanel />} />
                  <Route
                    path="/update-user/:userId"
                    element={<EditProfile />}
                  />
                </>
              )}

              {UserService.sellerOnly() && (
                <>
                  <Route
                    path="/admin/user-management"
                    element={<UserManagement />}
                  />
                  {/* <Route path="/LoggedUser" element={<Contents />} /> */}
                  <Route path="/productStore" element={<ProductStore />} />
                  <Route
                    path="/recentOrders"
                    element={<SellerRecentOrders />}
                  />
                  <Route path="/clientReturns" element={<ClientReturns />} />
                  <Route path="/clientReviews" element={<ClientReviews />} />
                  <Route path="/seller/addproduct" element={<AddProduct />} />
                  <Route
                    path="/editproduct/:productID"
                    element={<EditProduct />}
                  />
                </>
              )}
              {/* {UserService.buyerOnly() && <></>} */}
            </Routes>
          </div>

          {/* Footer Section*/}

          {isAuthenticated ? (
            UserService.buyerOnly() ? (
              <PublicFooter />
            ) : UserService.adminOnly() ? (
              ""
            ) : (
              <AuthenticatedFooter />
            )
          ) : (
            <PublicFooter />
          )}
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
