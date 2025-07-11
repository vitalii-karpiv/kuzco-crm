import { Typography } from "antd";
import PropTypes from "prop-types";

export default function FilterWrapper({ label, children }) {
  return (
    <div className={"bg-slate-200 p-2 rounded m-1"}>
      <Typography.Text className={"block"}>{label}</Typography.Text>
      {children}
    </div>
  );
}

FilterWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
