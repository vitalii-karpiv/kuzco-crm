import {useEffect, useState} from "react";
import OrderService from "../api/services/order-service.js";
import {Table} from "antd";
import { useNavigate } from "react-router-dom";

export default function Orders() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadOrders() {
            const ordersDto = await OrderService.list({});
            setOrders(ordersDto.itemList);
            setIsLoading(false);
        }
        loadOrders();
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <Table
            dataSource={orders}
            columns={getColumns()}
            onRow={(record) => {
                return {
                    onClick: () => {navigate(`orderDetail/${record._id}`)},
                };
            }}
        />
    )
}

function getColumns() {
    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'DateOfPurchase',
            dataIndex: 'dateOfPurchase',
            key: 'dateOfPurchase',
        },
        {
            title: 'ItemsInLog',
            dataIndex: 'itemsInLog',
            key: 'itemsInLog',
        }
    ]
}