import $api from "../http";

export default class AuthService {
  static async login(dto) {
    const result = await $api.post("/auth/login", dto);
    return result.data;
  }
  static async register(dto) {
    const result = await $api.post("/auth/register", dto);
    return result.data;
  }
  static async refresh(dto) {
    const result = await $api.get("/auth/refresh", dto);
    return result.data;
  }
  static async logout() {
    await $api.post("/auth/logout");
  }
}
