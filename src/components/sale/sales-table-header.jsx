import { Button, Typography } from "antd";
import PropTypes from "prop-types";

export default function SalesTableHeader({ onClick }) {
  return (
    <div className={"flex justify-between pl-2 pr-2"}>
      <Typography.Title level={3}>Sales</Typography.Title>
      <Button type={"primary"} onClick={onClick}>
        + Register sale
      </Button>
    </div>
  );
}

SalesTableHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
};
