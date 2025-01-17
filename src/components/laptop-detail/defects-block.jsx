import {Button, Card, Image, Input, Typography, Upload} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {API_URL} from "../../api/http/index.js";
import {UploadOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import LaptopService from "../../api/services/laptop-service.js";

export default function DefectsBlock({laptop, setLaptop, defectImageList, handleDefectChange}) {

    async function handleSaveDefect(index, value) {
        const newDefects = [...laptop.defects];
        newDefects[index] = value;
        await LaptopService.update({id: laptop._id, defects: newDefects});
        setLaptop({...laptop, defects: newDefects});
    }

    return (
        <Card bordered={false} hoverable={true} className={"w-2/4"}>
            <div className={"flex justify-between align-middle"}>
                <Typography.Title level={4}>Defects</Typography.Title>
                <Button size={"small"} onClick={() => setLaptop({...laptop, defects: [...laptop.defects, ""]})}><FontAwesomeIcon
                    icon={faPlus}/></Button>
            </div>
            {laptop?.defects &&
                <ul className={"list-disc mb-4 ml-3"}>
                    {laptop.defects.map((defect, index) => {
                            return <li key={defect} className={"my-1"}><Input defaultValue={defect} onPressEnter={(e) => handleSaveDefect(index, e.target.value)} onBlur={(e) => handleSaveDefect(index, e.target.value)}/></li>
                        }
                    )}
                </ul>
            }
            <div>
                <div className={"mb-2"}>
                    {defectImageList && <Image.PreviewGroup>
                        {defectImageList.map((item) => (
                            <div className={"m-1 p-1 inline"} key={item}>
                                <Image key={item} src={item} width={80} height={80} className={"block rounded-xl"}/>
                            </div>
                        ))}
                    </Image.PreviewGroup>
                    }
                </div>

                <Upload
                    name="image"
                    action={`${API_URL}/image/upload`}
                    data={{laptopId: laptop._id, isDefect: true}}
                    multiple={true}
                    onChange={handleDefectChange}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                </Upload>
            </div>
        </Card>
    )
}

DefectsBlock.propTypes = {
    laptop: PropTypes.object.isRequired,
    setLaptop: PropTypes.func.isRequired,
    defectImageList: PropTypes.array.isRequired,
    handleDefectChange: PropTypes.func.isRequired,
}