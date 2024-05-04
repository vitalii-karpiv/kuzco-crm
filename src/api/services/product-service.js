import $api from "../http";

export default class ProductService {
    static async list(dto) {
        const result = await $api.get("/product", dto);
        return result.data;
    }
    static async get(id) {
        const result = await $api.get(`/product/${id}`);
        return result.data;
    }
    static async update(dto) {
        const result = await $api.patch("/product", dto);
        return result.data;
    }
    static async create(dto) {
        const result = await $api.post("/product", dto);
        return result.data;
    }
    static async delete(id) {
        const result = await $api.get(`/product/${id}`);
        return result.data;
    }
}