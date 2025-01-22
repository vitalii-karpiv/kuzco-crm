import {Card, Input, Select, Typography} from "antd";
import PropTypes from "prop-types";
import LaptopService from "../../api/services/laptop-service.js";
import TextArea from "antd/es/input/TextArea.js";
import {useEffect, useState} from "react";
import TagService from "../../api/services/tag-service.js";

export default function CharacteristicsBlock({laptop = {}}) {

    const [ports, setPorts] = useState([]);

    useEffect(() => {
        loadPorts();
    }, []);

    async function loadPorts() {
        const ports = await TagService.list({type: "port"})
        setPorts(ports.itemList.map(port => ({label: port.name, value: port.name})));
    }

    async function handleSaveProperty(property, value) {
        await LaptopService.update({id: laptop._id, characteristics: { ...laptop.characteristics, [property]: value } });
    }

    async function handleSaveNote(value) {
        await LaptopService.update({id: laptop._id, note: value });
    }

    async function handleSaveServiceTag(value) {
        await LaptopService.update({id: laptop._id, serviceTag: value });
    }

    return (
        <Card bordered={false} hoverable={true} className={"w-2/4 mr-3"}>
            <div className={"flex justify-between"}>
                <Typography.Title level={4}>Characteristics</Typography.Title>
            </div>
            <div className={"block ml-3"}>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Service Tag: </p>
                    <Input
                        className={"w-2/3 ml-2"}
                        onBlur={(e) => handleSaveServiceTag(e.target.value)}
                        defaultValue={laptop.serviceTag}
                        size={"small"}/>
                </div>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Processor: </p>
                    <Input
                        className={"w-2/3 ml-2"}
                        onBlur={(e) => handleSaveProperty("processor", e.target.value)}
                        defaultValue={laptop.characteristics?.processor}
                        size={"small"}/>
                </div>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Videocard: </p>
                    <Input
                        className={"w-2/3 ml-2"}
                        onBlur={(e) => handleSaveProperty("videocard", e.target.value)}
                        defaultValue={laptop.characteristics?.videocard}
                        size={"small"}/>
                </div>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>SSD: </p>
                    <Input
                        className={"w-2/3 ml-2"}
                        onBlur={(e) => handleSaveProperty("ssd", e.target.value)}
                        defaultValue={laptop.characteristics?.ssd}
                        size={"small"}/>
                </div>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>RAM: </p>
                    <Input
                        className={"w-2/3 ml-2"}
                        onBlur={(e) => handleSaveProperty("ram", e.target.value)}
                        defaultValue={laptop.characteristics?.ram}
                        size={"small"}/>
                </div>
                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Screen: </p>
                    <Input
                        className={"w-2/3 ml-2"}
                        onBlur={(e) => handleSaveProperty("screen", e.target.value)}
                        defaultValue={laptop.characteristics?.screen}
                        size={"small"}/>
                </div>

                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Ports: </p>
                    <Select
                        mode="multiple"
                        defaultValue={laptop.characteristics?.ports}
                        onChange={(value) => handleSaveProperty("ports", value)}
                        options={ports}
                        className={"w-2/3 ml-2"}
                        size={"small"}
                    />
                </div>

                <div className={"flex mb-2"}>
                    <p className={"w-1/4"}>Note: </p>
                    <TextArea
                        rows={4}
                        textArea
                        className={"w-2/3 ml-2"}
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