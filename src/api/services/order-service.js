import $api from "../http";

export default class OrderService {
    static async list(dto) {
        const result = await $api.get("/order", dto);
        return result.data;
    }
    static async get(id) {
        const result = await $api.get(`/order/${id}`);
        return result.data;
    }
    static async update(dto) {
        const result = await $api.patch("/order", dto);
        return result.data;
    }
    static async setState(dto) {
        const result = await $api.post("/order/setState", dto);
        return result.data;
    }
    static async setCounterparty(dto) {
        const result = await $api.post("/order/setCounterparty", dto);
        return result.data;
    }
    static async create(dto) {
        const result = await $api.post("/order", dto);
        return result.data;
    }
    static async delete(id) {
        const result = await $api.delete(`/order/${id}`);
        return result.data;
    }
}
