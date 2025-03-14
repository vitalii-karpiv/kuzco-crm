import {Button, Card, Select, Typography} from "antd";
import PropTypes from "prop-types";
import {useState} from "react";
import StockManager from "../../helpers/stock-manager.js";

export default function FilterBar({filters, setFilters}) {

    const [onlyFree, setOnlyFree] = useState(!filters.state);

    return (
        <Card bordered={true} size={"small"} className={"w-full ml-3 mb-2"}>
            <Typography.Title level={5}>Filter bar</Typography.Title>
            <div className={"flex"}>
                <Button className={"mr-2"} onClick={() => {
                    setOnlyFree(!onlyFree);
                    setFilters({...filters, state: onlyFree ? "free": null})
                }}>{onlyFree ? "All" : "Free only"}</Button>
                <Select className={"w-40"}
                        allowClear
                        onChange={e => setFilters({...filters, type: e})}
                >
                    {StockManager.getStockTypeList().map(type => {
                        return <Select.Option value={type} key={type}>{StockManager.getStockTypeLabel(type)}</Select.Option>
                    })}
                </Select>
            </div>
        </Card>
    )
}

FilterBar.propTypes = {
    filters: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
}