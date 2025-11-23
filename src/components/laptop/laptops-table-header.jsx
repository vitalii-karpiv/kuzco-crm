import { Button } from "antd";
import PropTypes from "prop-types";

export default function LaptopsTableHeader({ onClick, onExport }) {
  return (
    <div className={"flex justify-between pl-2 pr-2"}>
      <h3 className={"font-bold text-2xl align-middle"}>Laptops</h3>
      <div className={"flex gap-2"}>
        <Button onClick={onExport}>Export Excel</Button>
        <Button type={"primary"} onClick={onClick}>
          + Add laptop
        </Button>
      </div>
    </div>
  );
}

LaptopsTableHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
};
