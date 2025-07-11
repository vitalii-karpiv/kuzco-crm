import $api from "../http";

export default class StockService {
  static async list(dto) {
    const result = await $api.post("/stock/list", dto);
    return result.data;
  }
  static async get(id) {
    const result = await $api.get(`/stock/${id}`);
    return result.data;
  }
  static async update(dto) {
    const result = await $api.patch("/stock", dto);
    return result.data;
  }
  static async create(dto) {
    const result = await $api.post("/stock", dto);
    return result.data;
  }
  static async delete(id) {
    const result = await $api.get(`/stock/${id}`);
    return result.data;
  }
}
