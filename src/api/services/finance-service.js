import $api from "../http";

export default class FinanceService {
    static async getCostPricePerLaptop(orderId) {
        const result = await $api.get(`/finance/costPrice/laptop/${orderId}`);
        return result.data;
    }
    static async getCostPricePerOrder(orderId) {
        const result = await $api.get(`/finance/costPrice/order/${orderId}`);
        return result.data;
    }
}
