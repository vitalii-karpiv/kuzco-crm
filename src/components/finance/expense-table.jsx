import {Table, Typography} from "antd";
import {useEffect, useState} from "react";
import ExpenseService from "../../api/services/expense-service.js";
import NumberRenderer from "./money-renderer.jsx";
import DateView from "../date-view.jsx";

export default function ExpenseTable() {
    const [expenses, setExpenses] = useState();

    useEffect(() => {
        loadExpenses();
    }, []);

    async function loadExpenses() {
        const expensesDtoOut = await ExpenseService.list({});
        setExpenses(expensesDtoOut.itemList);
    }

    function getDataSource(expenses) {
        if (!expenses) return [];
        const reversed = expenses.reverse();
        return reversed.map(expense => {
            const dateString = String(expense.time) + "000";
            return {
                key: Math.random(),
                amount: expense.amount,
                time: new Date(parseInt(dateString)).toISOString(),
                type: expense.type,
                order: expense.order,
            }
        })

    }

    const columns = [
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => <NumberRenderer amount={amount} />
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (date) => <DateView dateStr={date} showTime />
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Order',
            dataIndex: 'order',
            key: 'order',
        },
    ];


    if (!expenses) {
        return <div>Loading...</div>;
    }

    return <Table
        className={"m-3"}
        dataSource={getDataSource(expenses)}
        columns={columns}
        size={"small"}
        title={() => <Typography.Title level={4}>Expenses</Typography.Title>}
    />
}

ExpenseTable.propTypes = {
}