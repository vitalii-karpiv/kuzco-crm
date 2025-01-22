import {Card, Input, Select, Typography} from "antd";
import PropTypes from "prop-types";
import TextArea from "antd/es/input/TextArea.js";
import OrderManager from "../../helpers/order-manager.js";
import DateView from "../date-view.jsx";
import OrderService from "../../api/services/order-service.js";
import {useEffect, useState} from "react";
import FinanceService from "../../api/services/finance-service.js";
import PriceView from "../price-view.jsx";

export default function BasicInfoBlock({order = {}, setOrder}) {

    const [pricePerOrder, setPricePerOrder] = useState(0);
    const [pricePerLaptop, setPricePerLaptop] = useState(0);

    useEffect(() => {
        async function loadPrices() {
            const pricePerOrder = await FinanceService.getCostPricePerOrder(order._id);
            const pricePerLaptop = await FinanceService.getCostPricePerLaptop(order._id);
            setPricePerOrder(pricePerOrder);
            setPricePerLaptop(pricePerLaptop);
        }
        loadPrices();
    }, [order._id, order.itemsInLot]);

    async function handleSaveProperty(property, value) {
        const updated = await OrderService.update({id: order._id, [property]: value  });
        setOrder(updated);
    }

    async function handleSetState(state) {
        const updated = await OrderService.setState({id: order._id, state });
        setOrder(updated);
    }

    return (
        <Card bordered={false} hoverable={true} className={"w-2/4 mr-3"}>
            <div className={"flex justify-between"}>
                <Typography.Title level={4}>Info</Typography.Title>
            </div>
            <div className={"block"}>
                <div className={"flex mb-3"}>
                    <p className={"w-1/4"}>Order cost: </p>
                    <span className={"ml-2"}>
                        <PriceView amount={pricePerOrder}/>
                    </span>
                </div>
                <div className={"flex mb-3"}>
                    <p className={"w-1/4"}>Cost per laptop: </p>
                    <span className={"ml-2"}>
                        <PriceView amount={pricePerLaptop}/>
                    </span>
                </div>
                <div className={"flex mb-3"}>
                    <p className={"w-1/4"}>Items in lot: </p>
                    <Input
                        className={"w-2/3 ml-2"}
                        onBlur={(e) => handleSaveProperty("itemsInLot", parseInt(e.target.value))}
                        defaultValue={order.itemsInLot}
                        size={"small"}/>
                </div>
                <div className={"flex mb-3"}>
                    <p className={"w-1/4"}>Ebay URL: </p>
                    <Input
                        className={"w-2/3 ml-2"}
                        onBlur={(e) => handleSaveProperty("ebayUrl", e.target.value)}
                        defaultValue={order.ebayUrl}
                        size={"small"}/>
                </div>
                <div className={"flex mb-3"}>
                    <p className={"w-1/4"}>Shipping URL: </p>
                    <Input
                        className={"w-2/3 ml-2"}
                        onBlur={(e) => handleSaveProperty("shippingUrl", e.target.value)}
                        defaultValue={order.shippingUrl}
                        size={"small"}/>
                </div>
                <div className={"flex mb-3"}>
                    <p className={"w-1/4"}>Date of purchase: </p>
                    <span className={"w-2/3 ml-2"}>
                        <DateView dateStr={order.dateOfPurchase} />
                    </span>
                </div>
                <div className={"flex mb-3"}>
                    <p className={"w-1/4"}>State: </p>
                    <Select className={"w-2/3 ml-2"} size={"small"} defaultValue={order.state} onChange={(state) => handleSetState(state)}>
                        {OrderManager.getOrderStateList().map(orderState => <Select.Option key={orderState} value={orderState}>{OrderManager.getOrderStateLabel(orderState)}</Select.Option>)}
                    </Select>
                </div>
                <div className={"flex mb-3"}>
                    <p className={"w-1/4"}>Note: </p>
                    <TextArea
                        rows={4}
                        textArea
                        className={"w-2/3 ml-2"}
                        onBlur={(e) => handleSaveProperty("note", e.target.value)}
                        defaultValue={order.note}
                        size={"small"}
                    />
                </div>
            </div>
        </Card>
    )
}

BasicInfoBlock.propTypes = {
    order: PropTypes.object.isRequired,
    setOrder: PropTypes.func.isRequired,
}