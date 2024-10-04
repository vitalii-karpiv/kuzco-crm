import {Modal, Form, Input, Alert} from 'antd';
import {useState} from "react";
import LaptopService from "../../api/services/laptop-service.js";

export default function CreateLaptopModal({createModalOpen, onClose}) {

    const [form] = Form.useForm();

    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const onCreate = async (values) => {
        try {
            await LaptopService.create(values);
            onClose();
        } catch (e) {
            setShowErrorAlert(true);
        }
    };

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
                   >
                       {dom}
                   </Form>
               )}>
            {showErrorAlert && <> <Alert message="Failed to create laptop!" type="error" showIcon closable/> <br/> </>}
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
                <Input/>
            </Form.Item>
        </Modal>
    )


}