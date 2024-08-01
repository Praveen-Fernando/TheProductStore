import axios from "axios";

export class ProductService {
  static BASE_URL = "http://localhost:8080";

  static async addProduct(productData, token) {
    try {
      const response = await axios.post(
        `${ProductService.BASE_URL}/seller/addproduct`,
        productData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(product_Id, productData, token) {
    try {
      const response = await axios.get(
        `${ProductService.BASE_URL}/seller/product/${product_Id}`,
        productData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getCurrentUserProduct(token) {
    try {
      const response = await axios.get(
        `${ProductService.BASE_URL}/seller/myproducts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getProductByName(productName) {
    try {
      const response = await axios.get(
        `${ProductService.BASE_URL}/public/products/${productName}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getProductByCategory(productCategory) {
    try {
      const response = await axios.get(
        `${ProductService.BASE_URL}/public/products/${productCategory}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getProductById(product_Id, token) {
    try {
      const response = await axios.get(
        `${ProductService.BASE_URL}/public/product/${product_Id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllProducts() {
    try {
      const response = await axios.get(
        `${ProductService.BASE_URL}public/products`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProduct(product_Id, token) {
    try {
      const response = await axios.get(
        `${ProductService.BASE_URL}/seller/product/${product_Id}`,
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

  static login() {
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
