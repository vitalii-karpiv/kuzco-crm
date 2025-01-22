import PropTypes from "prop-types";
import {Card, Table, Typography} from "antd";
import {useEffect, useState} from "react";
import ExpenseService from "../../api/services/expense-service.js";
import DateView from "../date-view.jsx";
import PriceView from "../price-view.jsx";

export default function ExpenseTable({order = {}}) {

    const [expenseList, setExpenseList] = useState([]);

    useEffect(() => {
        async function loadExpenses(order) {
            const expenses = await ExpenseService.list({orderId: order._id});
            setExpenseList(expenses.itemList);
        }

        if (order) {
            loadExpenses(order);
        }
    }, [order]);

    const getExpenseColumns = () => {
        return [
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                render: (amount) => <PriceView amount={amount} />
            },
            {
                title: 'Time',
                dataIndex: 'time',
                key: 'time',
                render: (time) => <DateView dateStr={time * 1000} showTime />
            },
        ]
    }

    return (
        <Card bordered={false} hoverable={true} className={"w-full my-3"}>
            <div className={"flex justify-between"}>
                <Typography.Title level={4}>Expenses</Typography.Title>
            </div>
            <Table
                pagination={false}
                className={"w-full"}
                dataSource={expenseList}
                columns={getExpenseColumns()}
                size={"small"}
                showHeader={true}
            />
        </Card>
    )
}

ExpenseTable.propTypes = {
    order: PropTypes.object.isRequired,
}