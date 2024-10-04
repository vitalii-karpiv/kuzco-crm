import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import OrderService from "../api/services/order-service.js";
import Loading from "../components/loading.jsx";
import { Image, Table } from "antd"
import LaptopService from "../api/services/laptop-service.js";
import ExpenseService from "../api/services/expense-service.js";
import DateView from "../components/date.jsx";

export default function OrderDetail() {
    let {id} = useParams();

    const [order, setOrder] = useState();
    const [laptopList, setLaptopList] = useState();
    const [expenseList, setExpenseList] = useState();

    useEffect(() => {
        async function loadOrder() {
            const order = await OrderService.get(id);
            setOrder(order);
        }

        loadOrder();
    }, [id]);

    useEffect(() => {
        async function loadLaptops(order) {
            const laptops = await LaptopService.list({orderId: order._id});
            setLaptopList(laptops.itemList);
        }

        if (order) {
            loadLaptops(order);
        }
    }, [order]);

    useEffect(() => {
        async function loadExpenses(order) {
            const expenses = await ExpenseService.list({orderId: order._id});
            setExpenseList(expenses.itemList);
        }

        if (order) {
            loadExpenses(order);
        }
    }, [order]);


    const getLaptopColumns = () => {
        return [
            {
                title: 'Brand',
                dataIndex: 'brand',
                key: 'brand',
            },
            {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
            },
        ]
    }

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
            },
        ]
    }

    if (!order) {
        return <Loading/>
    }

    return <div className={"block w-full mx-5"}>
        <header>
            <h1 className={"text-xl mb-3"}>{order.name}</h1>
        </header>
        <div
            className={"w-full bg-slate-300 my-2 p-8 rounded-lg drop-shadow-md hover:drop-shadow-xl backdrop-blur-sm"}>
            <div className={"flex"}>
                <Image
                    width={200}
                    height={200}
                    src="https://static.vecteezy.com/system/resources/thumbnails/022/597/173/small_2x/3d-order-online-shop-png.png"
                    fallback="data:image/png;base64,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"
                />
                <div className={"block ml-3"}>
                    <p>Items in lot: {order.itemsInLot}</p>
                    <p>State: {order.state}</p>
                    <p>DateOfPurchase: <DateView dateStr={order.dateOfPurchase} /></p>
                    <p>Ebay URL: <a href={order.ebayUrl}>{order.ebayUrl}</a></p>
                </div>
            </div>
        </div>
        <div className={"my-2"}>
            <h1 className={"text-xl mb-3"}>State history</h1>
            <div className={"w-full bg-slate-300 p-8 rounded-lg drop-shadow-md hover:drop-shadow-xl"}>
                {order.stateHistory.map((state) => {
                    return <div key={state.timestamp} className={"bg-slate-400 p-4 rounded-lg m-3"}>
                        {state.state} {state.timestamp} {state.initiator}
                    </div>
                })}
            </div>
        </div>
        <div className={"my-2"}>
            <h1 className={"text-xl mb-3"}>Laptops</h1>
            <div className={"w-full bg-slate-300 p-8 rounded-lg drop-shadow-md hover:drop-shadow-xl"}>
                {laptopList &&
                    <Table
                        className={"ml-3 w-full"}
                        dataSource={laptopList}
                        columns={getLaptopColumns()}
                        size={"middle"}
                        showHeader={true}
                    />}
            </div>
        </div>
        <div className={"my-2"}>
            <h1 className={"text-xl mb-3"}>Expenses</h1>
            <div className={"w-full bg-slate-300 p-8 rounded-lg drop-shadow-md hover:drop-shadow-xl"}>
                {expenseList &&
                    <Table
                        className={"ml-3 w-full"}
                        dataSource={expenseList}
                        columns={getExpenseColumns()}
                        size={"middle"}
                        showHeader={true}
                    />}
            </div>
        </div>

    </div>
}