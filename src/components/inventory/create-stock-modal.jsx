import {Form, Input, InputNumber, Modal, Select} from 'antd';
import StockService from "../../api/services/stock-service.js";
import PropTypes from 'prop-types';
import StockManager from "../../helpers/stock-manager.js";
import {useState} from "react";

export default function CreateStockModal({createModalOpen, closeCreateModal, handleReload}) {
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    const onCreate = async (values) => {
        setIsLoading(true);
        try {
            await StockService.create({...values, state: StockManager.getStockStateMap().FREE, price: parseFloat(values.price)});
            await handleReload();
            setIsLoading(false);
            closeCreateModal();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Modal title="Create stock"
               open={createModalOpen}
               onCancel={closeCreateModal}
               okText="Create"
               cancelText="Cancel"
               okButtonProps={{
                   loading: isLoading,
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
            <Form.Item
                name="name"
                label="Title"
                rules={[
                    {
                        required: true,
                        message: 'Please input the title of order!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[
                {
                    required: true,
                    message: 'Please input price!',
                },
            ]}>
                <Input type="number"/>
            </Form.Item>
            <Form.Item
                name="type"
                label="Type"
                required={true}
                rules={[
                    {
                        required: true,
                        message: 'Please select type!',
                    },
                ]}>
                <Select>
                    {StockManager.getStockTypeList().map((type) =>
                        <Select.Option key={type}
                                       value={type}>{StockManager.getStockTypeLabel(type)}</Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item
                name="quantity"
                label="Quantity">
                <InputNumber className={"w-full"} min={1} max={100000} defaultValue={1} />
            </Form.Item>
        </Modal>
    )


}

CreateStockModal.propTypes = {
    createModalOpen: PropTypes.bool.isRequired,
    closeCreateModal: PropTypes.func.isRequired,
    handleReload: PropTypes.func.isRequired
}