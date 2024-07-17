import axios from "axios";

export class UserService {
  static BASE_URL = "http://localhost:8080";

  static async login(email, password) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async register(userData, token) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/auth/register`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers(token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/admin/get-all-users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserProfile(token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/adminuser/get-profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(user_id, token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/admin/get-user/${user_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(user_id, token) {
    try {
      const response = await axios.delete(
        `${UserService.BASE_URL}/admin/delete/${user_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(user_id, userData, token) {
    try {
      const response = await axios.put(
        `${UserService.BASE_URL}/admin/update/${user_id}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /** AUTHENTICATION CHECKER */

  static logout() {
    localStorage.removeItem(`token`);
    localStorage.removeItem(`role`);
  }

  static isAuthenticated() {
    const token = localStorage.getItem(`token`);
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem(`role`);
    return role === "ADMIN";
  }

  static isSeller() {
    const role = localStorage.getItem(`role`);
    return role === "SELLER";
  }

  static isBuyer() {
    const role = localStorage.getItem(`role`);
    return role === "BUYER";
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }
}
