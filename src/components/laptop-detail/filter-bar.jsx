import {Card, Checkbox, Input, Select, Typography} from "antd";
import LaptopManager from "../../helpers/laptop-manager.js";
import LaptopStateTag from "../common/laptop-state-tag.jsx";
import PropTypes from "prop-types";

export default function FilterBar({filters, setFilters}) {

    return (
        <Card bordered={true} size={"small"} className={"w-full ml-3 my-2"}>
            <Typography.Title level={5}>Filter bar</Typography.Title>
            <div className={"flex justify-between"}>
                <div className={"w-1/4"}>
                    <FilterWrapper label={"State"}>
                        <Select onChange={e => setFilters({...filters, state: e})} className={"w-full"} mode="multiple">
                            {LaptopManager.getLaptopStateList().map(state => {
                                return <Select.Option value={state} key={state}><LaptopStateTag
                                    state={state}/></Select.Option>
                            })}
                        </Select>
                    </FilterWrapper>
                    <FilterWrapper label={"Title"}>
                        <Input onChange={e => setFilters({...filters, name: e.target.value})} size={"small"}/>
                    </FilterWrapper>
                </div>
                <div className={"w-1/4"}>
                    <FilterWrapper label={"Diagonal"}>
                        <Input size={"small"} onChange={e => setFilters({...filters, screenSize: parseFloat(e.target.value)})}/>
                    </FilterWrapper>
                    <FilterWrapper label={"Матриця"}>
                        <Select onChange={e => setFilters({...filters, panelType: e})}
                                className={"w-full"}
                                allowClear
                                options={LaptopManager.getPanelTypeListOptions()}
                        >
                        </Select>
                    </FilterWrapper>
                </div>
                <div className={"w-1/4"}>
                    <FilterWrapper label={"SSD"}>
                        <Input onChange={e => setFilters({...filters, ssd: parseFloat(e.target.value)})} size={"small"}/>
                    </FilterWrapper>
                    <FilterWrapper label={"RAM"}>
                        <Input onChange={e => setFilters({...filters, ram: parseFloat(e.target.value)})} size={"small"}/>
                    </FilterWrapper>
                </div>
                <div className={"w-1/5"}>
                    <CheckboxFilterWrapper label={"Touch"} setFilters={setFilters} filters={filters} filterName={"touch"}/>
                    <CheckboxFilterWrapper label={"Videocard"} setFilters={setFilters} filters={filters} filterName={"discrete"}/>
                    <CheckboxFilterWrapper label={"Підсвітка"} setFilters={setFilters} filters={filters} filterName={"keyLight"}/>
                </div>
            </div>
        </Card>
    )
}

function FilterWrapper({label, children}) {
    return (
        <div className={"bg-slate-300 p-2 rounded mb-1"}>
            <Typography.Text className={"block"}>{label}</Typography.Text>
            {children}
        </div>
    )
}

function CheckboxFilterWrapper({label, filterName, setFilters, filters}) {
    return (
        <div className={"bg-slate-300 p-2 rounded mb-1"}>
            <Typography.Text className={"mr-2"}>{label}</Typography.Text>
            <Checkbox onClick={e => setFilters({...filters, [filterName]: e.target.checked})}/>
        </div>
    )
}

FilterBar.propTypes = {
    filters: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
}

FilterWrapper.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
}

CheckboxFilterWrapper.propTypes = {
    label: PropTypes.string.isRequired,
    filterName: PropTypes.string.isRequired,
    setFilters: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
}