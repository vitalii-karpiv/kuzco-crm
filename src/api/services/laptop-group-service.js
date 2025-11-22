import $api from "../http";

export default class LaptopGroupService {
  static async list(dto) {
    const result = await $api.post("/laptopGroup/list", dto);
    return result.data;
  }
  static async get(id) {
    const result = await $api.get(`/laptopGroup/${id}`);
    return result.data;
  }
  static async update(dto) {
    const result = await $api.patch("/laptopGroup", dto);
    return result.data;
  }
  static async create(dto) {
    const result = await $api.post("/laptopGroup", dto);
    return result.data;
  }
  static async delete(id) {
    const result = await $api.delete(`/laptopGroup/${id}`);
    return result.data;
  }
  static async addLaptop(dto) {
    const result = await $api.post("/laptopGroup/addLaptop", dto);
    return result.data;
  }
}

