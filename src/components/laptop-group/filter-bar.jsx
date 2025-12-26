import { Card, Input, Select, Typography } from "antd";
import PropTypes from "prop-types";
import LaptopGroupManager from "../../helpers/laptop-group-manager.js";
import LaptopGroupStateTag from "../common/laptop-group-state-tag.jsx";
import FilterWrapper from "../common/filter-wrapper.jsx";

export default function FilterBar({ filters, setFilters }) {
  const handleGroupNameChange = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, groupName: value || undefined });
  };

  const handleStateChange = (value) => {
    setFilters({ ...filters, state: value && value.length > 0 ? value : undefined });
  };

  const handleInstagramPublishedChange = (value) => {
    let isInstagramPublished;
    if (value === "yes") {
      isInstagramPublished = true;
    } else if (value === "no") {
      isInstagramPublished = false;
    } else {
      isInstagramPublished = undefined;
    }
    setFilters({ ...filters, isInstagramPublished });
  };

  const getInstagramPublishedValue = () => {
    if (filters.isInstagramPublished === true) return "yes";
    if (filters.isInstagramPublished === false) return "no";
    return undefined;
  };

  return (
    <Card bordered={true} size={"small"} className={"ml-3 mb-2"}>
      <Typography.Title level={5}>Filter bar</Typography.Title>
      <div className={"flex"}>
        <FilterWrapper label={"Group Name"}>
          <Input
            className={"w-40"}
            size={"small"}
            value={filters.groupName || ""}
            onChange={handleGroupNameChange}
            placeholder="Search by name"
          />
        </FilterWrapper>
        <FilterWrapper label={"State"}>
          <Select
            className={"w-40"}
            mode="multiple"
            allowClear
            value={filters.state}
            onChange={handleStateChange}
            placeholder="Select states"
          >
            {LaptopGroupManager.getLaptopGroupStateList().map((state) => {
              return (
                <Select.Option value={state} key={state}>
                  <LaptopGroupStateTag state={state} />
                </Select.Option>
              );
            })}
          </Select>
        </FilterWrapper>
        <FilterWrapper label={"Instagram Published"}>
          <Select
            className={"w-40"}
            allowClear
            value={getInstagramPublishedValue()}
            onChange={handleInstagramPublishedChange}
            placeholder="All"
          >
            <Select.Option value="yes">Yes</Select.Option>
            <Select.Option value="no">No</Select.Option>
          </Select>
        </FilterWrapper>
      </div>
    </Card>
  );
}

FilterBar.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

