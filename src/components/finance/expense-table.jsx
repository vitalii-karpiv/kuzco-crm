import {Button, Table, Typography} from "antd";
import {useEffect, useState} from "react";
import ExpenseService from "../../api/services/expense-service.js";
import DateView from "../date-view.jsx";
import OrderService from "../../api/services/order-service.js";
import FinanceService from "../../api/services/finance-service.js";
import PropTypes from "prop-types";
import PriceView from "../price-view.jsx";
import ExpenseManager from "../../helpers/expense-manager.js";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ExpenseCreateModal from "./expense-create-modal.jsx";
import {useUserContext} from "../user-context.jsx";
import ExpenseDetailModal from "./expense-detail-modal.jsx";

const ONE_DAY = 86400000

const FOOTER = () => <div></div>

export default function ExpenseTable() {
    const [expenses, setExpenses] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [expenseDetail, setExpenseDetail] = useState(null);
    const { users } = useUserContext();

    useEffect(() => {
        loadData()
    }, []);

    async function loadData() {
        await loadExpenses();
        await loadOrders();
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

    const columns = [
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => <PriceView amount={String(amount)}/>
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 200,
            render: (type) => { return ExpenseManager.getExpenseTypeLabel(type) }
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (date) => <DateView dateStr={new Date(parseInt(date) * 1000).toISOString()} showTime/>
        },
        {
            title: 'Order',
            dataIndex: 'orderId',
            key: 'orderId',
            width: 300,
            render: (orderId) => {
                const order = orders.find(order => order._id === orderId);
                if (!order) return <p>—</p>
                return `${order?.code} ${order?.name}` }
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
            className={"my-2 w-full"}
            dataSource={expenses}
            columns={columns}
            size={"small"}
            key={"_id"}
            pagination={false}
            virtual={true}
            scroll={{y: 500}}
            onScroll={() => {
                // TODO: load more data when scrolled to bottom
            }}
            loading={isLoading}
            rowClassName={(record) => {
                let commonClasses = "text-center";
                if (!record.orderId) commonClasses += " bg-pink-100"
                else commonClasses += " bg-cyan-50"
                return commonClasses;
            }}
            onRow={(record) => {
                return {
                    onClick: () => {
                        setExpenseDetail(record)
                        setOpenDetailModal(true)
                    },
                };
            }}
            title={() => <ExpenseTableHeader loadExpenses={loadExpenses} setIsLoading={setIsLoading} setOpenCreateModal={setOpenCreateModal} />}
            footer={FOOTER}
        />
        {
            openCreateModal && <ExpenseCreateModal open={openCreateModal} handleReload={loadData}
                                                   closeCreateModal={() => setOpenCreateModal(false)}/>
        }
        {
            openDetailModal && expenseDetail && <ExpenseDetailModal open={openDetailModal} onClose={() => setOpenDetailModal(false)} expense={expenseDetail} orders={orders}/>
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
                <Button icon={<FontAwesomeIcon icon={faPlus}/>} className={"mr-2 bg-sky-400 text-white"}
                        onClick={() => setOpenCreateModal(true)}>Add expense</Button>
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
