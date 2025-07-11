import PropTypes from "prop-types";
import { Tag } from "antd";
import OrderManager from "../../helpers/order-manager.js";

export default function CounterpartyStateTag({ counterparty }) {
  return (
    <Tag color={OrderManager.getCounterpartyColor(counterparty)}>{OrderManager.getCounterpartyLabel(counterparty)}</Tag>
  );
}

CounterpartyStateTag.propTypes = {
  counterparty: PropTypes.string.isRequired,
};
