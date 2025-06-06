import $api from "../http";

export default class LaptopService {
    static async list(dto) {
        const result = await $api.post("/laptop/list", dto);
        return result.data;
    }
    static async get(id) {
        const result = await $api.get(`/laptop/${id}`);
        return result.data;
    }
    static async update(dto) {
        const result = await $api.patch("/laptop", dto);
        return result.data;
    }
    static async setState(dto) {
        const result = await $api.post("/laptop/setState", dto);
        return result.data;
    }
    static async create(dto) {
        const result = await $api.post("/laptop", dto);
        return result.data;
    }
    static async delete(id) {
        const result = await $api.delete(`/laptop/${id}`);
        return result.data;
    }
    static async getDescription(id) {
        const result = await $api.get(`/laptop/description/${id}`);
        return result.data;
    }
}
