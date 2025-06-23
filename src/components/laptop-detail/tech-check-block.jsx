import PropTypes from "prop-types";
import {Button, Card, Checkbox, message, Tooltip, Typography} from "antd";
import LaptopManager from "../../helpers/laptop-manager.js";
import LaptopService from "../../api/services/laptop-service.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquarePen} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";


export default function TechCheckBlock({laptop, setLaptop}) {

    const [messageApi, contextHolder] = message.useMessage();
    const [isEditing, setIsEditing] = useState(false);

    async function handleUpdate() {
        let updated;
        try {
            updated = await LaptopService.update({id: laptop._id, techCheck: {...laptop.techCheck}});
        } catch (e) {
            messageApi.open({
                duration: 3,
                type: 'error',
                content: 'Laptop update failed. Please refresh the page.',
            });
            console.log(e);
        }
        setLaptop(updated);
        setIsEditing(false);
    }

    return (
        <Card bordered={false} hoverable={true} className={"h-2/4 mb-2"}>
            {contextHolder}
            <div className={"flex justify-between align-middle"}>
                <Tooltip placement="topLeft" title={"Вєталь Глухан не навтикай"}>
                    <Typography.Title level={4}>Tech check</Typography.Title>
                </Tooltip>
                <Button size={"small"} icon={<FontAwesomeIcon icon={faSquarePen}/>} onClick={() => {
                    isEditing ? handleUpdate() : setIsEditing(true)
                }}>{isEditing ? "Save" : "Edit"}</Button>
            </div>
            <div className={"flex flex-wrap"}>
                {Object.keys(laptop.techCheck).map((item) => {
                    return (
                        <Typography.Text key={item} className={"block w-56 my-1"}>
                            {LaptopManager.getTechCheckLabels(item)}
                            <Checkbox className={"ml-2"}
                                      disabled={!isEditing}
                                      defaultChecked={laptop.techCheck[item]}
                                      onChange={(e) => laptop.techCheck[item] = e.target.checked}
                            />
                        </Typography.Text>
                    )
                })}
            </div>
        </Card>
    )
}

TechCheckBlock.propTypes = {
    laptop: PropTypes.object.isRequired,
    setLaptop: PropTypes.func.isRequired,
}