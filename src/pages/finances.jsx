
import ExpenseTable from "../components/finance/expense-table.jsx";
import InvestmentTable from "../components/finance/investment-table.jsx";

export default function Finances() {

    return (
        <div>
            <div className={"flex"}>
                <ExpenseTable />
                <InvestmentTable />
            </div>
        </div>
    )
}