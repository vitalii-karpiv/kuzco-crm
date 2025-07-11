import $api from "../http";

export default class CustomerService {
  static async get(id) {
    const result = await $api.get(`/customer/${id}`);
    return result.data;
  }
  static async createOrUpdate(dto) {
    const result = await $api.post("/customer", dto);
    return result.data;
  }
}
