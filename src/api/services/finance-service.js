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
    static async syncExpenses(dto) {
        const result = await $api.post(`/finance/expense/sync`, dto);
        return result.data;
    }
    static async createExpense(dto) {
        const result = await $api.post(`/finance/expense`, dto);
        return result.data;
    }
    static async balanceList(dto) {
        const result = await $api.post(`/finance/balance/list`, dto);
        return result.data;
    }
    static async balanceSync(dto) {
        const result = await $api.post(`/finance/balance/sync`, dto);
        return result.data;
    }

    // Investments
    static async createInvestment(dto) {
        const result = await $api.post(`/finance/investment`, dto);
        return result.data;
    }

    static async getRevenueAndEarnings(dto) {
        const result = await $api.post(`/finance/revenueAndEarnings`, dto);
        return result.data;
    }
}
