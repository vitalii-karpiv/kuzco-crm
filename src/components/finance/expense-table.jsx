import {Button, Select, Table, Typography} from "antd";
import {useEffect, useState} from "react";
import ExpenseService from "../../api/services/expense-service.js";
import DateView from "../date-view.jsx";
import OrderService from "../../api/services/order-service.js";
import FinanceService from "../../api/services/finance-service.js";
import PropTypes from "prop-types";
import PriceView from "../price-view.jsx";
import UserService from "../../api/services/user-service.js";
import ExpenseManager from "../../helpers/expense-manager.js";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ExpenseCreateModal from "./expense-create-modal.jsx";

const ONE_DAY = 86400000

export default function ExpenseTable() {
    const [expenses, setExpenses] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    useEffect(() => {
        loadData()
    }, []);

    async function loadData() {
        await loadExpenses();
        await loadOrders();
        await loadUsers();
        setIsLoading(false);
    }

    async function loadExpenses() {
        const expensesDtoOut = await ExpenseService.list({});
        setExpenses(expensesDtoOut.itemList);
    }

    async function loadOrders() {
        const ordersDtoOut = await OrderService.list({});
        setOrders(ordersDtoOut.itemList);
    }

    async function loadUsers() {
        const usersList = await UserService.list();
        setUsers(usersList);
    }

    async function handleOrderSelect(orderId, expenseId) {
        await ExpenseService.update({id: expenseId, orderId});
        await loadExpenses();
    }

    async function handleTypeUpdate(expenseId, type) {
        await ExpenseService.update({id: expenseId, type});
        await loadExpenses();
    }

    const columns = [
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => <PriceView amount={amount} />
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 200,
            render: (type, expense) => {
                return <Select className={"w-full"} defaultValue={ExpenseManager.getExpenseTypeLabel(type)} onChange={(type) => handleTypeUpdate(expense._id, type)} >
                    {ExpenseManager.getExpenseTypeList().map(type => <Select.Option key={type} value={type}>{ExpenseManager.getExpenseTypeLabel(type)}</Select.Option>)}
                </Select>
            }
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (date) => <DateView dateStr={new Date(parseInt(date) * 1000).toISOString()} showTime />
        },
        {
            title: 'Order',
            dataIndex: 'orderId',
            key: 'orderId',
            width: 300,
            render: (orderId, expense) => {
                return <Select className={"w-full"} defaultValue={orders.find(order => order._id === orderId)?.name} onChange={(orderId) => handleOrderSelect(orderId, expense._id)}>
                    {orders.map(order => <Select.Option key={order._id} value={order._id}>{order.name}</Select.Option>)}
                </Select>
            }
        },
        {
            title: 'Card owner',
            dataIndex: 'cardOwner',
            key: 'cardOwner',
            render: (userId) => {
                if (!users) return <p>Loading...</p>;
                const user = users.find(user => user._id === userId);
                if (!user) return <p>-</p>
                return <p>{user.surname}</p>
            }
        },
    ];

    return <>
    <Table
        className={"mt-2 w-full"}
        dataSource={expenses}
        columns={columns}
        size={"small"}
        key={"_id"}
        loading={isLoading}
        rowClassName={(record) => {
            let commonClasses = "text-center";
            if (!record.orderId) commonClasses += " bg-red-100"
            return commonClasses;
        }}
        title={() => <ExpenseTableHeader loadExpenses={loadExpenses} setIsLoading={setIsLoading} setOpenCreateModal={setOpenCreateModal} />}
    />
        {
            openCreateModal && <ExpenseCreateModal open={openCreateModal} handleReload={loadData} closeCreateModal={() => setOpenCreateModal(false)} />
        }
        </>
}

export function ExpenseTableHeader({loadExpenses, setIsLoading, setOpenCreateModal}) {

    async function handleSyncExpenses() {
        const now = new Date();
        const dto = {
            from: Number((now.getTime() - ONE_DAY).toString().slice(0, -3)),
            to: Number(now.getTime().toString().slice(0, -3))
        }
        setIsLoading(true);
        await FinanceService.syncExpenses(dto)
        await loadExpenses();
        setIsLoading(false);
    }

    return (
        <div className={"flex justify-between align-middle"}>
            <Typography.Title level={4}>Expenses</Typography.Title>
            <div>
                <Button icon={<FontAwesomeIcon icon={faPlus}/>} className={"mr-2 bg-sky-400 text-white"} onClick={() => setOpenCreateModal(true)}>Add expense</Button>
                <Button onClick={handleSyncExpenses}>Sync expenses</Button>
            </div>
        </div>
    )
}

ExpenseTableHeader.propTypes = {
    loadExpenses: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    setOpenCreateModal: PropTypes.func.isRequired
}
