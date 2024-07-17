import { Link } from "react-router-dom";
import { UserService } from "../service/UserService";

export default function Navbar() {
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();

  const handleLogout = () => {
    const confirmDelete = window.confirm("Are You sure?");
    if (confirmDelete) {
      UserService.logout();
    }
  };

  return (
    <nav>
      <ul>
        {!isAuthenticated && (
          <li>
            <Link to="/">Dev</Link>
          </li>
        )}
      </ul>
      <ul>
        {isAuthenticated && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}
      </ul>
      <ul>
        {isAdmin && (
          <li>
            <Link to="/admin/user-management">User Management</Link>
          </li>
        )}
      </ul>
      <ul>
        {isAuthenticated && (
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
