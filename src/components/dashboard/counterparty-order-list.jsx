import {Card, Typography} from "antd";
import {Link} from "react-router-dom";
import {useUserContext} from "../user-context.jsx";
import OrderService from "../../api/services/order-service.js";
import {useEffect, useState} from "react";
import OrderStateTag from "../common/order-state-tag.jsx";
import DateView from "../date-view.jsx";

export default function CounterpartyOrderList() {
    const {me} = useUserContext();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {
        setIsLoading(true)
        const ordersDto = await OrderService.list({counterparty: me?._id});
        setOrders(ordersDto.itemList);
        setIsLoading(false)
    }

    return (
        <Card className={"w-2/4 ml-2 mt-1"} loading={isLoading}>
            <Typography.Title level={4}>Counterparty for orders</Typography.Title>
            <ol className={"list-disc list-inside space-y-2 overflow-y-auto max-h-[310px]"}>
                {orders.map((order) => (<li key={order.code}>
                    <Link target={"_blank"} to={`/orders/orderDetail/${order._id}`} className={"bg-violet-50 rounded p-1"}><Typography.Text code>{order.code}</Typography.Text> {order.name} <OrderStateTag state={order.state} /> <DateView dateStr={order.dateOfPurchase}/></Link>
                </li>))}
            </ol>
        </Card>
    )
}

CounterpartyOrderList.propTypes = {
}
