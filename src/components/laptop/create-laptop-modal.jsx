import {Modal, Form, Alert, Select, Button} from 'antd';
import {useEffect, useState} from "react";
import LaptopService from "../../api/services/laptop-service.js";
import PropTypes from 'prop-types';
import TagService from "../../api/services/tag-service.js";

export default function CreateLaptopModal({createModalOpen, onClose}) {

    const [form] = Form.useForm();

    const [brandList, setBrandList] = useState();
    const [modelList, setModelList] = useState();
    const [subModelList, setSubModelList] = useState();

    const [model, setModel] = useState();
    const [subModel, setSubModel] = useState();

    const [showErrorAlert, setShowErrorAlert] = useState(false);

    useEffect(() => {
        fetchTagList("brand", null, setBrandList);
    }, []);

    const onCreate = async (values) => {
        try {
            await LaptopService.create(values);
            onClose();
        } catch (e) {
            setShowErrorAlert(true);
        }
    };

    const onBrandSelect = async (value) => {
        setModel(null);
        setModelList(null);
        setSubModel(null);
        setSubModelList(null);
        await fetchTagList("model", value, setModelList);
    }

    const onModelSelect = async (value) => {
        setModel(value)
        setSubModel(null);
        setSubModelList(null);
        await fetchTagList("submodel", value, setSubModelList);
    }

    const onSubModelSelect = async (value) => {
        setSubModel(value)
    }

    const fetchTagList = async (type, parentId, setFunc) => {
        const tagDtoOut = await TagService.list({type, parentId})
        setFunc(tagDtoOut.itemList);
    }

    return (
        <Modal title="Create laptop"
               open={createModalOpen}
               onCancel={onClose}
               okText="Create"
               cancelText="Cancel"
               okButtonProps={{
                   autoFocus: true,
                   htmlType: 'submit',
               }}
               destroyOnClose
               modalRender={(dom) => (
                   <Form
                       layout="vertical"
                       form={form}
                       name="form_in_modal"
                       initialValues={{
                           modifier: 'public',
                       }}
                       clearOnDestroy
                       onFinish={(values) => onCreate(values)}
                       onValuesChange={(values) => console.log(values)}
                   >
                       {dom}
                   </Form>
               )}>
            {showErrorAlert && <> <Alert message="Failed to create laptop!" type="error" showIcon closable onClose={() => setShowErrorAlert(false)}/> <br/> </>}
            <Form.Item
                name="brand"
                label="Brand"
                rules={[
                    {
                        required: true,
                        message: 'Please input the brand of laptop!',
                    },
                ]}
            >
                <Select
                    disabled={!brandList}
                    onSelect={onBrandSelect}
                    allowClear
                >
                    {brandList?.map((tag) =>
                        <Select.Option key={tag._id}
                                       value={tag._id}>{tag.name}</Select.Option>
                    )}
                    <Select.Option disabled>
                        <Button shape="circle" size={"small"} onClick={() => console.log("add tag clicked")}>+</Button>
                    </Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="model"
                label="Model"
                rules={[
                    {
                        required: true,
                        message: 'Please input the model of laptop!',
                    },
                ]}
            >
                <Select disabled={!modelList} value={model} onSelect={onModelSelect} allowClear>
                    {modelList?.map((tag) =>
                        <Select.Option key={tag._id}
                                       value={tag._id}>{tag.name}</Select.Option>
                    )}
                    <Select.Option disabled>
                        <Button shape="circle" size={"small"} onClick={() => console.log("add tag clicked")}>+</Button>
                    </Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="submodel"
                label="Sub Model"
                rules={[
                    {
                        required: true,
                        message: 'Please input the sub model of laptop!',
                    },
                ]}
            >
                <Select disabled={!subModelList} value={[subModel]} onSelect={onSubModelSelect} allowClear>
                    {subModelList?.map((tag) =>
                        <Select.Option key={tag._id}
                                       value={tag._id}>{tag.name}</Select.Option>
                    )}
                    <Select.Option disabled>
                        <Button shape="circle" size={"small"} onClick={() => console.log("add tag clicked")}>+</Button>
                    </Select.Option>
                </Select>
            </Form.Item>
        </Modal>
    )


}


CreateLaptopModal.propTypes = {
    createModalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}