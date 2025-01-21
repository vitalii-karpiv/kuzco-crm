import {Select, Table, Typography} from "antd";
import {useEffect, useState} from "react";
import ExpenseService from "../../api/services/expense-service.js";
import NumberRenderer from "./money-renderer.jsx";
import DateView from "../date-view.jsx";
import OrderService from "../../api/services/order-service.js";

export default function ExpenseTable() {
    const [expenses, setExpenses] = useState([]);
    const [orders, setOrders] = useState();

    useEffect(() => {
        loadExpenses();
        loadOrders();
    }, []);

    async function loadExpenses() {
        const expensesDtoOut = await ExpenseService.list({});
        setExpenses(expensesDtoOut.itemList);
    }

    async function loadOrders() {
        const ordersDtoOut = await OrderService.list({});
        setOrders(ordersDtoOut.itemList);
    }

    async function handleOrderSelect(orderId, expenseId) {
        await ExpenseService.update({id: expenseId, orderId});
        await loadExpenses();
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
            render: (date) => <DateView dateStr={new Date(parseInt(date)).toISOString()} showTime />
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Order',
            dataIndex: 'orderId',
            key: 'orderId',
            width: 300,
            render: (orderId, expense) => {
                console.log("orderId", orders);
                return <Select className={"w-full"} defaultValue={orders.find(order => order._id === orderId)?.name} onChange={(orderId) => handleOrderSelect(orderId, expense._id)}>
                    {orders.map(order => <Select.Option key={order._id} value={order._id}>{order.name}</Select.Option>)}
                </Select>
            }
        },
    ];

    if (!expenses || !orders) {
        return <div>Loading...</div>;
    }

    return <Table
        className={"m-3"}
        dataSource={expenses}
        columns={columns}
        size={"small"}
        key={"_id"}
        rowClassName={(record) => {
            let commonClasses = "text-center";
            if (!record.orderId) commonClasses += " bg-red-100"
            return commonClasses;
        }}
        title={() => <Typography.Title level={4}>Expenses</Typography.Title>}
    />
}

ExpenseTable.propTypes = {
}