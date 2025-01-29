import {Card, Input, Select} from "antd";
import PropTypes from "prop-types";
import DateView from "../date-view.jsx";
import SaleStateTag from "../common/sale-state-tag.jsx";
import SaleService from "../../api/services/sale-service.js";
import SaleManager from "../../helpers/sale-manager.js";

export default function SaleDetailCard({sale, setSale}) {

    async function handleSaveAttribute(property, value) {
        const updated = await SaleService.update({id: sale._id, laptopId: sale.laptopId, [property]: value});
        setSale(updated);
    }

    return (
        <Card bordered={false} hoverable={true} className={"w-2/4 mr-2"}>
            <div className={"flex mb-2"}>
                <p className={"w-1/4"}>Price: </p>
                <Input
                    type={"number"}
                    className={"w-2/3"}
                    onBlur={(e) => handleSaveAttribute("price", parseFloat(e.target.value))}
                    defaultValue={sale.price}
                    size={"small"}/>
            </div>
            <div className={"flex mb-2"}>
                <p className={"w-1/4"}>Date: </p>
                <DateView dateStr={sale.date} showTime/>
            </div>
            <div className={"flex mb-2"}>
                <p className={"w-1/4"}>Source: </p>
                <Select
                    defaultValue={sale?.source}
                    onChange={(value) => handleSaveAttribute("source", value)}
                    options={SaleManager.getSourceListOptions()}
                    className={"w-2/3"}
                    size={"small"}
                />
            </div>
            <div className={"flex mb-2"}>
                <p className={"w-1/4"}>Delivery: </p>
                <Select
                    defaultValue={sale?.deliveryType}
                    onChange={(value) => handleSaveAttribute("deliveryType", value)}
                    options={SaleManager.getDeliveryTypeListOptions()}
                    className={"w-2/3"}
                    size={"small"}
                />
            </div>
            <div className={"flex mb-2"}>
                <p className={"w-1/4"}>TTN: </p>
                <Input
                    className={"w-2/3"}
                    onBlur={(e) => handleSaveAttribute("ttn", e.target.value)}
                    defaultValue={sale.ttn}
                    size={"small"}/>
            </div>
            <div className={"flex mb-2"}>
                <p className={"w-1/4"}>State: </p>
                <SaleStateTag state={sale.state} />
            </div>
        </Card>
    )
}

SaleDetailCard.propTypes = {
    sale: PropTypes.object.isRequired,
    setSale: PropTypes.func.isRequired,
}