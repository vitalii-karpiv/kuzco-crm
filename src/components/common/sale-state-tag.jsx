import PropTypes from "prop-types";
import { Tag } from "antd";
import SaleManager from "../../helpers/sale-manager.js";

export default function SaleStateTag({ state }) {
  return <Tag color={SaleManager.getStateColor(state)}>{SaleManager.getStateLabel(state)}</Tag>;
}

SaleStateTag.propTypes = {
  state: PropTypes.string.isRequired,
};
