import PropTypes from "prop-types";
import { Tag } from "antd";
import LaptopGroupManager from "../../helpers/laptop-group-manager.js";

export default function LaptopGroupStateTag({ state }) {
  return (
    <Tag className={""} color={LaptopGroupManager.getLaptopGroupStateColor(state)}>
      {LaptopGroupManager.getLaptopGroupStateLabel(state)}
    </Tag>
  );
}

LaptopGroupStateTag.propTypes = {
  state: PropTypes.string.isRequired,
};
