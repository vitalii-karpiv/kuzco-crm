const expenseTypeList = [
    "delivery",
    "purchase",
    "stock",
    "tax",
    "other",
]

const expenseTypeLabelMap = {
    "delivery": "Delivery",
    "purchase": "Purchase",
    "stock": "Stock",
    "tax": "Tax",
    "other": "Other",
}

class ExpenseManager {
    getExpenseTypeList() {
        return expenseTypeList;
    }

    getExpenseTypeLabel(type) {
        return expenseTypeLabelMap[type];
    }
}

export default new ExpenseManager();