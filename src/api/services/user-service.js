import $api from "../http";

export default class InvestmentService {
    static async list(dto) {
        const result = await $api.post("/user/list", dto);
        return result.data;
    }
    static async update(dto) {
        const result = await $api.patch("/user", dto);
        return result.data;
    }
    static async create(dto) {
        const result = await $api.post("/user", dto);
        return result.data;
    }
    static async get(id) {
        const result = await $api.get(`/user/${id}`);
        return result.data;
    }
    static async whoami() {
        const result = await $api.get(`/user/whoami`);
        return result.data;
    }
    static async delete(id) {
        const result = await $api.get(`/user/${id}`);
        return result.data;
    }
}
