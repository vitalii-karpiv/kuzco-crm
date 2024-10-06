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
    static async delete(id) {
        const result = await $api.get(`/sale/${id}`);
        return result.data;
    }
}
