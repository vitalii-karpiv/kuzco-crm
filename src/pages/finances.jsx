import ExpenseTable from "../components/finance/expense-table.jsx";
import InvestmentTable from "../components/finance/investment-table.jsx";
import BalanceCard from "../components/finance/balance-card.jsx";
import RevenueEarnCard from "../components/finance/revenue-earn-card.jsx";

export default function Finances() {
    document.title = "Finances";

    return (
        <div className={"w-full mx-2"}>
            <RevenueEarnCard/>
            <BalanceCard/>
            <ExpenseTable/>
            <InvestmentTable/>
        </div>
    )
}