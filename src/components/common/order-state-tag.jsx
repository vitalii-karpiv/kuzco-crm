import PropTypes from "prop-types";
import {Tag} from "antd";
import OrderManager from "../../helpers/order-manager.js";

export default function OrderStateTag({state}) {
    return <Tag color={OrderManager.getOrderStateColor(state)}>{OrderManager.getOrderStateLabel(state)}</Tag>
}

OrderStateTag.propTypes = {
    state: PropTypes.string.isRequired,
}

