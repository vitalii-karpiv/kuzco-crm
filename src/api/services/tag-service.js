import $api from "../http";

export default class TagService {
  static async list(dto) {
    const result = await $api.post("/tag/list", dto);
    return result.data;
  }
  static async create(dto) {
    const result = await $api.post("/tag", dto);
    return result.data;
  }
}
