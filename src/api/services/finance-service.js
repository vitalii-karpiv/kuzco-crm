import $api from "../http";

export default class FinanceService {
    static async getCostPricePerLaptop(orderId) {
        const result = await $api.get(`/finance/costPrice/${orderId}`);
        return result.data;
    }
}
