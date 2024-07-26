import React, { useEffect, useState } from "react";
import Authentication from "../auth/Authentication";
import { UserService } from "../service/UserService";

export default function TestComponent() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    dob: "",
    gender: "",
    address: "",
  });
  const [error, setError] = useState(null);
  const userId = "4"; // Replace with a valid user ID
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmF2ZWVuQGdtYWlsLmNvbSIsImlhdCI6MTcyMTk4NDU2MSwiZXhwIjoxNzIxOTg4MTYxfQ.apfggpw4BIDLxOyCmXQhzlbjpG4dF5ZRWTf8-xkwlrg";

  const data = {
    name: "Praveen",
    email: "praveen@gmail.com",
    contact: "011264949",
    dob: "1998-04-06",
    gender: "Male",
    address: "No: 25/4",
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserService.updateUser(userId, data, token);
        console.log("Fetched User Data:", userData); // Log the fetched data
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user data:", err); // Log any errors
        setError(err.message);
      }
    };

    fetchUser();
  }, [userId, token]);
}
