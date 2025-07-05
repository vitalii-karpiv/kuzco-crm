import {Button, Card, DatePicker, Select, Typography} from "antd";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSort, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import SaleManager from "../../helpers/sale-manager.js";
import SaleStateTag from "../common/sale-state-tag.jsx";
import FilterWrapper from "../common/filter-wrapper.jsx";

const {RangePicker} = DatePicker;

export default function FilterAndSorterBar({filters, setFilters, sorters, setSorters}) {
    return (
        <Card bordered={true} size={"small"} className={"ml-3 mb-2"}>
            <Typography.Title level={5}>Filter & sorter</Typography.Title>
            <div className={"flex items-center"}>
                <Button className={"mr-2"} onClick={() => updateSorter(sorters, "date", setSorters)}
                        icon={getIcon(sorters.date)}>Date</Button>
                <FilterWrapper label={"State"}>
                    <Select onChange={e => setFilters({...filters, state: e})} className={"w-40"} mode="multiple">
                        {SaleManager.getSaleStateList().map(state => {
                            return <Select.Option value={state} key={state}><SaleStateTag
                                state={state}/></Select.Option>
                        })}
                    </Select>
                </FilterWrapper>
                <RangePicker picker="date"
                             className={"h-16"}
                             onChange={(range) => {
                                 let dateRange = null;
                                 if (range?.length) dateRange = {
                                     from: new Date(range[0].$d),
                                     to: new Date(range[1].$d)
                                 }
                                 setFilters({
                                     ...filters, dateRange
                                 })
                             }}
                />
            </div>
        </Card>
    )
}

function updateSorter(sorters, key, setSorters) {
    if (sorters[key] === "asc") {
        setSorters({...sorters, [key]: "desc"});
    } else if (sorters[key] === "desc") {
        delete sorters[key];
        setSorters({...sorters});
    } else {
        sorters[key] = "asc";
        setSorters({...sorters, [key]: "asc"});
    }
}

function getIcon(sorter) {
    if (sorter === "asc") {
        return <FontAwesomeIcon icon={faSortUp}/>
    } else if (sorter === "desc") {
        return <FontAwesomeIcon icon={faSortDown}/>
    } else {
        return <FontAwesomeIcon icon={faSort}/>
    }
}

FilterAndSorterBar.propTypes = {
    filters: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    sorters: PropTypes.object.isRequired,
    setSorters: PropTypes.func.isRequired
}