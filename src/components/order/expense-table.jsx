import PropTypes from "prop-types";
import { Card, Select, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import ExpenseService from "../../api/services/expense-service.js";
import DateView from "../date-view.jsx";
import ExpenseAmountView from "../expense-amount-view.jsx";
import ExpenseManager from "../../helpers/expense-manager.js";

export default function ExpenseTable({ order = {} }) {
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    async function loadExpenses(order) {
      const expenses = await ExpenseService.list({ orderId: order._id });
      setExpenseList(expenses.itemList);
    }

    if (order) {
      loadExpenses(order);
    }
  }, [order]);

  async function handleTypeUpdate(expenseId, type) {
    await ExpenseService.update({ id: expenseId, type });
  }

  const getExpenseColumns = () => {
    return [
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount) => <ExpenseAmountView amount={amount} />,
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (type, expense) => {
          return (
            <Select
              className={"w-full"}
              defaultValue={ExpenseManager.getExpenseTypeLabel(type)}
              onChange={(type) => handleTypeUpdate(expense._id, type)}
            >
              {ExpenseManager.getExpenseTypeList().map((type) => (
                <Select.Option key={type} value={type}>
                  {ExpenseManager.getExpenseTypeLabel(type)}
                </Select.Option>
              ))}
            </Select>
          );
        },
      },
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
        render: (time) => <DateView dateStr={time * 1000} showTime />,
      },
    ];
  };

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
  );
}

ExpenseTable.propTypes = {
  order: PropTypes.object.isRequired,
};
