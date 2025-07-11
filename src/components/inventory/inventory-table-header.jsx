import { Button, Typography } from "antd";
import PropTypes from "prop-types";

export default function InventoryTableHeader({ onClick }) {
  return (
    <div className={"flex justify-between pl-2 pr-2"}>
      <Typography.Title level={3}>Inventory</Typography.Title>
      <Button type={"primary"} onClick={onClick}>
        + Add item
      </Button>
    </div>
  );
}

InventoryTableHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
};
