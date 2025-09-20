import AuthService from "../api/services/auth-service";
import axios from "axios";
import { API_URL } from "../api/http";

class AuthManager {
  constructor() {
    this.user = {};
    this.isAuthorized = false;
    this.isLoading = true;
  }

  setUser(user) {
    this.user = user;
  }

  setIsAuthorized(isAuthorized) {
    this.isAuthorized = isAuthorized;
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  async login(email, password) {
    const response = await AuthService.login({ email, password });
    localStorage.setItem("token", response.accessToken);
    this.setIsAuthorized(true);
    this.setUser(response.user);
  }

  async register(email, phone, fullName, password) {
    const response = await AuthService.register({ email, phone, fullName, password });
    localStorage.setItem("token", response.accessToken);
    this.setIsAuthorized(true);
    this.setUser(response.user);
  }

  async logout() {
    await AuthService.logout();
    localStorage.removeItem("token");
    this.setIsAuthorized(false);
    this.setUser({});
  }

  async checkAuth() {
    this.setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
      localStorage.setItem("token", response.data.accessToken);
      this.setIsAuthorized(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
}

const authManager = new AuthManager();
export default authManager;
