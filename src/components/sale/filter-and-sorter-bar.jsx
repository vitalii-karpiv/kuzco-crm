import {Button, Card, DatePicker, Select, Typography} from "antd";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSort, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import SaleManager from "../../helpers/sale-manager.js";
import SaleStateTag from "../common/sale-state-tag.jsx";

const {RangePicker} = DatePicker;

export default function FilterAndSorterBar({filters, setFilters, sorters, setSorters}) {
    return (
        <Card bordered={true} size={"small"} className={"w-full ml-3 mb-2"}>
            <Typography.Title level={5}>Filter & sorter</Typography.Title>
            <div className={"flex"}>
                <Button className={"mr-2"} onClick={() => updateSorter(sorters, "date", setSorters)} icon={getIcon(sorters.date)}>Date</Button>
                <div className={"bg-slate-300 p-2 rounded mb-1 w-40 mr-2"}>
                    <Select onChange={e => setFilters({...filters, state: e})} className={"w-full"} mode="multiple">
                        {SaleManager.getSaleStateList().map(state => {
                            return <Select.Option value={state} key={state}><SaleStateTag
                                state={state}/></Select.Option>
                        })}
                    </Select>
                </div>
                <RangePicker picker="date"
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