const expenseTypeList = ["delivery", "purchase", "advertisement", "stock", "tax", "other"];

const expenseTypeLabelMap = {
  delivery: "🚚 Delivery",
  purchase: "🛍️ Purchase",
  advertisement: "📢 Advertisement",
  stock: "⚙️ Stock",
  tax: "🏛️ Tax",
  other: "🤷 Other",
};

class ExpenseManager {
  getExpenseTypeList() {
    return expenseTypeList;
  }

  getExpenseTypeLabel(type) {
    const typeLabel = expenseTypeLabelMap[type];
    if (typeLabel) {
      return typeLabel;
    } else {
      console.warn(`Expense type "${type}" is not defined.`);
      return "—";
    }
  }
}

export default new ExpenseManager();
