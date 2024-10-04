import {Button} from "antd";

export default function OrdersTableHeader({onClick}) {
    return (
        <div className={"flex justify-between pl-2 pr-2"}>
            <h3 className={"font-bold text-2xl align-middle"}>Orders</h3>
            <Button type={"primary"} onClick={onClick}>+ Add order</Button>
        </div>
    )
}