import $api from "../http";

export default class ExpenseService {
  static async list(dto) {
    const result = await $api.post("/finance/expense/list", dto);
    return result.data;
  }
  static async get(id) {
    const result = await $api.get(`/finance/expense/${id}`);
    return result.data;
  }
  static async update(dto) {
    const result = await $api.patch("/finance/expense", dto);
    return result.data;
  }
  static async create(dto) {
    const result = await $api.post("/finance/expense", dto);
    return result.data;
  }
  static async delete(id) {
    const result = await $api.delete(`/finance/expense/${id}`);
    return result.data;
  }
}
