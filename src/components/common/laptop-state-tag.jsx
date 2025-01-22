import PropTypes from "prop-types";
import {Tag} from "antd";
import LaptopManager from "../../helpers/laptop-manager.js";

export default function LaptopStateTag({state}) {
    return <Tag className={""} color={LaptopManager.getLaptopStateColor(state)} >{LaptopManager.getLaptopStateLabel(state)}</Tag>
}

LaptopStateTag.propTypes = {
    state: PropTypes.string.isRequired,
}

