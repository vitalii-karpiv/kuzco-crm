import $api from "../http";

export default class InvestmentService {
  static async list(dto) {
    const result = await $api.post("/finance/investment/list", dto);
    return result.data;
  }
  static async update(dto) {
    const result = await $api.patch("/finance/investment", dto);
    return result.data;
  }
  static async create(dto) {
    const result = await $api.post("/finance/investment", dto);
    return result.data;
  }
  static async delete(id) {
    const result = await $api.get(`/finance/investment/${id}`);
    return result.data;
  }
}
