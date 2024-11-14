
import ExpenseTable from "../components/finance/expense-table.jsx";

export default function Finances() {

    return (
        <div>
            <div className={"flex"}>
                <div>revenue diagram</div>
                <div>capital diagram</div>
            </div>
            <div className={"flex"}>
                <ExpenseTable />
                <div>investments table</div>
            </div>
        </div>
    )
}