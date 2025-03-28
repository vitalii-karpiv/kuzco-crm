import {Card, Checkbox, Input, Select, Typography} from "antd";
import PropTypes from "prop-types";
import LaptopService from "../../api/services/laptop-service.js";
import TextArea from "antd/es/input/TextArea.js";
import LaptopManager from "../../helpers/laptop-manager.js";

export default function CharacteristicsBlock({laptop = {}}) {

    async function handleSaveProperty(property, value) {
        await LaptopService.update({id: laptop._id, characteristics: {...laptop.characteristics, [property]: value}});
    }

    async function handleSaveNote(value) {
        await LaptopService.update({id: laptop._id, note: value});
    }

    async function handleSaveServiceTag(value) {
        await LaptopService.update({id: laptop._id, serviceTag: value});
    }

    return (
        <Card bordered={false} hoverable={true} className={"w-2/4 mr-3"}>
            <div className={"flex justify-between"}>
                <Typography.Title level={4}>Characteristics</Typography.Title>
            </div>
            <div className={""}>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Service Tag: </p>
                    <Input
                        className={"w-2/3"}
                        onBlur={(e) => handleSaveServiceTag(e.target.value)}
                        defaultValue={laptop.serviceTag}
                        size={"small"}/>
                </div>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Processor: </p>
                    <Input
                        className={"w-2/3"}
                        onBlur={(e) => handleSaveProperty("processor", e.target.value)}
                        defaultValue={laptop.characteristics?.processor}
                        size={"small"}/>
                </div>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Videocard: </p>
                    <div className={"flex flex-col w-2/3 "}>
                        <Input
                            className={"w-full block"}
                            onBlur={(e) => handleSaveProperty("videocard", e.target.value)}
                            defaultValue={laptop.characteristics?.videocard}
                            size={"small"}/>

                        <Checkbox className={""} defaultChecked={laptop.characteristics?.discrete}
                                  onChange={(e) => handleSaveProperty("discrete", e.target.checked)}>Discrete</Checkbox>
                        <Checkbox className={""} defaultChecked={laptop.characteristics?.keyLight}
                                  onChange={(e) => handleSaveProperty("keyLight", e.target.checked)}>Підсвітка клави</Checkbox>
                    </div>
                </div>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>SSD: </p>
                    <Input
                        className={"w-2/3"}
                        onBlur={(e) => handleSaveProperty("ssd", parseFloat(e.target.value))}
                        defaultValue={laptop.characteristics?.ssd}
                        size={"small"}/>
                </div>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>RAM: </p>
                    <Input
                        className={"w-2/3"}
                        onBlur={(e) => handleSaveProperty("ram", parseFloat(e.target.value))}
                        defaultValue={laptop.characteristics?.ram}
                        size={"small"}/>
                </div>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Screen size: </p>
                    <div className={"flex flex-col w-2/3 "}>
                        <Input
                            className={"w-full"}
                            onBlur={(e) => handleSaveProperty("screenSize", parseFloat(e.target.value))}
                            defaultValue={laptop.characteristics?.screenSize}
                            size={"small"}/>

                        <Checkbox className={""} defaultChecked={laptop.characteristics?.touch}
                                  onChange={(e) => handleSaveProperty("touch", e.target.checked)}>Touch</Checkbox>
                    </div>
                </div>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Resolution: </p>
                    <Select
                        defaultValue={laptop.characteristics?.resolution}
                        onChange={(value) => handleSaveProperty("resolution", value)}
                        options={LaptopManager.getResolutionListOptions()}
                        className={"w-2/3"}
                        size={"small"}
                    />
                </div>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Panel Type: </p>
                    <Select
                        defaultValue={laptop.characteristics?.panelType}
                        onChange={(value) => handleSaveProperty("panelType", value)}
                        options={LaptopManager.getPanelTypeListOptions()}
                        className={"w-2/3"}
                        size={"small"}
                    />
                </div>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Refresh rate: </p>
                    <Select
                        defaultValue={laptop.characteristics?.refreshRate}
                        onChange={(value) => handleSaveProperty("refreshRate", value)}
                        options={LaptopManager.getRefreshRateListOptions()}
                        className={"w-2/3"}
                        size={"small"}
                    />
                </div>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Ports: </p>
                    <Select
                        mode="multiple"
                        defaultValue={laptop.characteristics?.ports}
                        onChange={(value) => handleSaveProperty("ports", value)}
                        options={LaptopManager.getPortsListOptions()}
                        className={"w-2/3"}
                        size={"small"}
                    />
                </div>

                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Note: </p>
                    <TextArea
                        rows={4}
                        textArea
                        className={"w-2/3"}
                        onBlur={(e) => handleSaveNote(e.target.value)}
                        defaultValue={laptop.note}
                        size={"small"}
                    />
                </div>
            </div>
        </Card>
    )
}

CharacteristicsBlock.propTypes = {
    laptop: PropTypes.object.isRequired,
}