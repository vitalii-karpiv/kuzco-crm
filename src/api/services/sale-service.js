import $api from "../http";

export default class SaleService {
  static async list(dto) {
    const result = await $api.post("/sale/list", dto);
    return result.data;
  }
  static async get(id) {
    const result = await $api.get(`/sale/${id}`);
    return result.data;
  }
  static async update(dto) {
    const result = await $api.patch("/sale", dto);
    return result.data;
  }
  static async create(dto) {
    const result = await $api.post("/sale", dto);
    return result.data;
  }
  static async setState(dto) {
    const result = await $api.post("/sale/setState", dto);
    return result.data;
  }
  static async delete(id) {
    const result = await $api.delete(`/sale/${id}`);
    return result.data;
  }
  static async updateAssignee(id, assignee) {
    const result = await $api.post(`/sale/setAssignee`, { id, assignee });
    return result.data;
  }
}
