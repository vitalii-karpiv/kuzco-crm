import { Card, Input, Select, Typography } from "antd";
import PropTypes from "prop-types";
import StockManager from "../../helpers/stock-manager.js";
import StockStateTag from "../common/stock-state-tag.jsx";
import FilterWrapper from "../common/filter-wrapper.jsx";

export default function FilterBar({ filters, setFilters }) {
  return (
    <Card bordered={true} size={"small"} className={"ml-3 mb-2"}>
      <Typography.Title level={5}>Filter bar</Typography.Title>
      <div className={"flex"}>
        <FilterWrapper label={"State"}>
          <Select className={"w-40"} allowClear onChange={(e) => setFilters({ ...filters, state: e })}>
            {StockManager.getStockStateList().map((state) => {
              return (
                <Select.Option value={state} key={state}>
                  <StockStateTag state={state} />
                </Select.Option>
              );
            })}
          </Select>
        </FilterWrapper>
        <FilterWrapper label={"Type"}>
          <Select className={"w-40"} allowClear onChange={(e) => setFilters({ ...filters, type: e })}>
            {StockManager.getStockTypeList().map((type) => {
              return (
                <Select.Option value={type} key={type}>
                  {StockManager.getStockTypeLabel(type)}
                </Select.Option>
              );
            })}
          </Select>
        </FilterWrapper>
        <FilterWrapper label={"Name"}>
          <Input onChange={(e) => setFilters({ ...filters, name: e.target.value })} size={"small"} />
        </FilterWrapper>
      </div>
    </Card>
  );
}

FilterBar.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
