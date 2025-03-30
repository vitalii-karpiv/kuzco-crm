import PropTypes from "prop-types";
import {Card, Checkbox, message, Tooltip, Typography} from "antd";
import LaptopManager from "../../helpers/laptop-manager.js";
import LaptopService from "../../api/services/laptop-service.js";


export default function TechCheckBlock({laptop, setLaptop}) {

    const [messageApi, contextHolder] = message.useMessage();

    async function handleUpdateTechCheck(key, value) {
        let updated;
        try {
            updated = await LaptopService.update({id: laptop._id, techCheck: {...laptop.techCheck, [key]: value}});
        } catch (e) {
            messageApi.open({
                duration: 3,
                type: 'error',
                content: 'Laptop update failed. Please refresh the page.',
            });
        }
        setLaptop(updated);
    }

    return (
        <Card bordered={false} hoverable={true} className={"w-2/4 mx-2"}>
            {contextHolder}
            <div className={"flex justify-between align-middle"}>
                <Tooltip placement="topLeft" title={"Вєталь Глухан не натупи пліз, бо ти можеш"}>
                    <Typography.Title level={4}>Tech check</Typography.Title>
                </Tooltip>
            </div>
            <div className={"flex flex-wrap"}>
                {Object.keys(laptop.techCheck).map((item) => {
                    return (
                        <Typography.Text key={item} className={"block w-56 my-1"}>
                            {LaptopManager.getTechCheckLabels(item)}
                            <Checkbox className={"ml-2"}
                                      defaultChecked={laptop.techCheck[item]}
                                      onClick={(e) => {
                                          handleUpdateTechCheck(item, e.target.checked)
                                      }}/>
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