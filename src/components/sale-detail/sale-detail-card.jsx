import {Card, Input, Select, Typography, Button, message, Spin} from "antd";
import PropTypes from "prop-types";
import DateView from "../date-view.jsx";
import SaleStateTag from "../common/sale-state-tag.jsx";
import SaleService from "../../api/services/sale-service.js";
import SaleManager from "../../helpers/sale-manager.js";
import {prettifyNumber} from "../../helpers/finance-manager.js";
import {useState} from "react";

export default function SaleDetailCard({sale, setSale}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    function handleFieldChange(property, value) {
        setEditValues(prev => ({...prev, [property]: value}));
    }

    async function handleSaveAll() {
        setIsLoading(true);
        try {
            const updated = await SaleService.update({
                id: sale._id,
                laptopId: sale.laptopId,
                ...editValues
            });
            setSale(updated);
            setIsEditing(false);
            setEditValues({});
            message.success("Sale updated successfully");
        } catch (e) {
            message.error("Failed to update sale");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card bordered={false} hoverable={true} className={"w-2/4 mr-2"}>
            <div className={"flex flex-col gap-2"}>
                <div className={"flex items-center justify-between mb-2"}>
                    <Typography.Title level={5} className={"m-0"}>Sale Details</Typography.Title>
                    <Button size="small" onClick={isEditing ? handleSaveAll : () => setIsEditing(true)} disabled={isLoading}>
                        {isLoading ? <Spin size="small" /> : isEditing ? 'Save' : 'Edit'}
                    </Button>
                </div>
                <div className={"flex items-center"}>
                    <span className={"w-1/4 text-gray-600"}>Price:</span>
                    {isEditing ? (
                        <Input
                            type={"number"}
                            className={"w-2/3"}
                            onChange={e => handleFieldChange("price", parseFloat(e.target.value))}
                            defaultValue={sale.price}
                            size={"small"}
                            disabled={isLoading}
                        />
                    ) : (
                        <Typography.Text className={"w-2/3 text-gray-800"}>{prettifyNumber(sale.price) ?? '-'}</Typography.Text>
                    )}
                </div>
                <div className={"flex items-center"}>
                    <span className={"w-1/4 font-medium text-gray-600"}>Date:</span>
                    <span className={"w-2/3 text-gray-800"}><DateView dateStr={sale.date} showTime/></span>
                </div>
                <div className={"flex items-center"}>
                    <span className={"w-1/4 font-medium text-gray-600"}>Source:</span>
                    {isEditing ? (
                        <Select
                            defaultValue={sale?.source}
                            onChange={value => handleFieldChange("source", value)}
                            options={SaleManager.getSourceListOptions()}
                            className={"w-2/3"}
                            size={"small"}
                            disabled={isLoading}
                        />
                    ) : (
                        <Typography.Text className={"w-2/3 text-gray-800"}>{SaleManager.getSourceListOptions().find(opt => opt.value === sale.source)?.label || '-'}</Typography.Text>
                    )}
                </div>
                <div className={"flex items-center"}>
                    <span className={"w-1/4 font-medium text-gray-600"}>Delivery:</span>
                    {isEditing ? (
                        <Select
                            defaultValue={sale?.deliveryType}
                            onChange={value => handleFieldChange("deliveryType", value)}
                            options={SaleManager.getDeliveryTypeListOptions()}
                            className={"w-2/3"}
                            size={"small"}
                            disabled={isLoading}
                        />
                    ) : (
                        <Typography.Text className={"w-2/3 text-gray-800"}>{SaleManager.getDeliveryTypeListOptions().find(opt => opt.value === sale.deliveryType)?.label || '-'}</Typography.Text>
                    )}
                </div>
                <div className={"flex items-center"}>
                    <span className={"w-1/4 font-medium text-gray-600"}>TTN:</span>
                    {isEditing ? (
                        <Input
                            className={"w-2/3"}
                            onChange={e => handleFieldChange("ttn", e.target.value)}
                            defaultValue={sale.ttn}
                            size={"small"}
                            disabled={isLoading}
                        />
                    ) : (
                        <Typography.Text className={"w-2/3 text-gray-800"}>{sale.ttn || '-'}</Typography.Text>
                    )}
                </div>
                <div className={"flex items-center"}>
                    <span className={"w-1/4 font-medium text-gray-600"}>State:</span>
                    <span className={"w-2/3"}><SaleStateTag state={sale.state} /></span>
                </div>
            </div>
        </Card>
    )
}

SaleDetailCard.propTypes = {
    sale: PropTypes.object.isRequired,
    setSale: PropTypes.func.isRequired,
}