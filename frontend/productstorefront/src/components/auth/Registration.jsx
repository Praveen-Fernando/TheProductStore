import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../service/UserService";

export default function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await UserService.register(formData, token);

      //clear form after submit
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
      });

      alert("User Registed Successfully");
      navigate("/admin/user-management");
    } catch (error) {
      console.log("Error registering user: " + error);
      alert("A error occurred while registering user");
    }
  };

  return (
    <div className="auth-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Role: </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
      </form>
    </div>
  );
}
