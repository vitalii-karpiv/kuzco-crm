import $api from "../http";

export default class OrderService {
    static async upload(dto) {
        const result = await $api.post("/image/upload", dto, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return result.data;
    }

    static async get(id) {
        const result = await $api.get(`/image/${id}`, {responseType: "blob"});
        return result.data;
    }

    static async list(laptopId) {
        const result = await $api.post(`/image/list`, {laptopId});
        return result.data;
    }
}
