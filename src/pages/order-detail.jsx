import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderService from "../api/services/order-service.js";
import Loading from "../components/loading.jsx";
import { Typography } from "antd";
import BasicInfoBlock from "../components/order/basic-info-block.jsx";
import StateHistory from "../components/order/state-history.jsx";
import LaptopTable from "../components/order/laptop-table.jsx";
import ExpenseTable from "../components/order/expense-table.jsx";

export default function OrderDetail() {
  let { id } = useParams();

  const [order, setOrder] = useState();

  useEffect(() => {
    async function loadOrder() {
      const order = await OrderService.get(id);
      document.title = `${order.code}`;
      setOrder(order);
    }

    loadOrder();
  }, [id]);

  if (!order) {
    return <Loading />;
  }

  return (
    <div className={"block w-full mx-5"}>
      <header>
        <Typography.Title level={3}>{order.name}</Typography.Title>
      </header>
      <div className={"flex justify-between align-middle"}>
        <BasicInfoBlock order={order} setOrder={setOrder} />
        <StateHistory order={order} />
      </div>
      <LaptopTable order={order} />
      <ExpenseTable order={order} />
    </div>
  );
}
