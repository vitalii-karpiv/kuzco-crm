import PropTypes from "prop-types";
import {Tag} from "antd";
import StockManager from "../../helpers/stock-manager.js";

export default function StockStateTag({state}) {
    return <Tag color={StockManager.getStockStateColor(state)}>{StockManager.getStockStateLabel(state)}</Tag>
}

StockStateTag.propTypes = {
    state: PropTypes.string.isRequired,
}

