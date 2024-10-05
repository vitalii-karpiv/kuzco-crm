import {Modal, Form, Input, DatePicker, Select, Alert} from 'antd';
import OrderManager from "../../helpers/order-manager.js";
import OrderService from "../../api/services/order-service.js";
import {useState} from "react";
import PropTypes from 'prop-types';

export default function CreateOrderModal({createModalOpen, closeCreateModal, handleReload}) {

    const [form] = Form.useForm();

    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const onCreate = async (values) => {
        values.itemsInLot = parseInt(values.itemsInLot);
        try {
            await OrderService.create(values);
            await handleReload();
            closeCreateModal();
        } catch (e) {
            setShowErrorAlert(true);
        }
    };

    return (
        <Modal title="Create order"
               open={createModalOpen}
               onCancel={closeCreateModal}
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
            {showErrorAlert && <> <Alert message="Failed to create order!" type="error" showIcon closable onClose={() => setShowErrorAlert(false)}/> <br/> </>}
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
            <Form.Item name="ebayUrl" label="Ebay URL" rules={[
                {
                    required: true,
                    message: 'Please input the URL of ebay order!',
                },
            ]}>
                <Input type="textarea"/>
            </Form.Item>
            <Form.Item name="itemsInLot" label="Items in lot" rules={[
                {
                    required: true,
                    message: 'Please input amount of laptops!',
                },
            ]}>
                <Input type="number"/>
            </Form.Item>
            <Form.Item
                name="state"
                label="Select"
                required={true}
                rules={[
                    {
                        required: true,
                        message: 'Please select state!',
                    },
                ]}>
                <Select>
                    {OrderManager.getOrderStateList().map((state) =>
                        <Select.Option key={state}
                                       value={state}>{OrderManager.getOrderStateLabel(state)}</Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item name="note" label="Note">
                <Input type="textarea"/>
            </Form.Item>
            <Form.Item name="dateOfPurchase" label="DatePicker" required={true} rules={[
                {
                    required: true,
                    message: 'Please input date of purchase!',
                },
            ]}>
                <DatePicker/>
            </Form.Item>
        </Modal>
    )


}

CreateOrderModal.propTypes = {
    createModalOpen: PropTypes.bool.isRequired,
    closeCreateModal: PropTypes.func.isRequired,
    handleReload: PropTypes.func.isRequired
}