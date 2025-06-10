import ExpenseTable from "../components/finance/expense-table.jsx";
import InvestmentTable from "../components/finance/investment-table.jsx";
import BalanceCard from "../components/finance/balance-card.jsx";

export default function Finances() {
    document.title = "Finances";

    return (
        <div className={"w-full mx-2"}>
            <BalanceCard/>
            <ExpenseTable/>
            <InvestmentTable/>
        </div>
    )
}