import {useEffect, useState} from "react";
import OrderService from "../api/services/order-service.js";
import {Table, Tag} from "antd";
import {Link, useNavigate} from "react-router-dom";
import OrderManager from "../helpers/order-manager.js";

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
            className={"ml-3 w-full"}
            dataSource={orders}
            columns={getColumns()}
            size={"middle"}
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
            defaultSortOrder: 'descend',
            sorter: (a, b) => new Date(a.dateOfPurchase) > new Date(b.dateOfPurchase),
            sortDirections: ['descend'],
        },
        {
            title: 'ItemsInLot',
            dataIndex: 'itemsInLot',
            key: 'itemsInLot',
        },
        {
            title: "State",
            dataIndex: "state",
            key: "state",
            render: (state) => <Tag color={OrderManager.getOrderStateColor(state)}>{OrderManager.getOrderStateLabel(state)}</Tag>,
            filters: OrderManager.getFilterList(),
            onFilter: (value, record) => record.state === value
        },
        {
            title: "Ebay URL",
            dataIndex: "ebayUrl",
            key: "ebayUrl",
            render: (text) => <Link to={text}>{text}</Link>,
        }
    ]
}