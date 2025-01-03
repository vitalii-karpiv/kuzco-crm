import {Modal, Form, Input, Select, Alert, InputNumber} from 'antd';
import {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import SaleManager from "../../helpers/sale-manager.js";
import LaptopService from "../../api/services/laptop-service.js";
import LaptopManager from "../../helpers/laptop-manager.js";
import SaleService from "../../api/services/sale-service.js";

export default function CreateSaleModal({createModalOpen, onClose, handleReload}) {

    const [form] = Form.useForm();

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [laptops, setLaptops] = useState([]);

    useEffect(() => {
        loadActiveLaptops();
    }, []);

    const onCreate = async (values) => {
        try {
            await SaleService.create(values);
            await handleReload();
            onClose();
        } catch (e) {
            setShowErrorAlert(true);
        }
    };

    async function loadActiveLaptops() {
        const laptopsDtoOut = await LaptopService.list({state: LaptopManager.getActiveStates()});
        setLaptops(laptopsDtoOut.itemList);
    }

    return (
        <Modal title="Register sale"
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
            {showErrorAlert && <> <Alert message="Failed to create order!" type="error" showIcon closable onClose={() => setShowErrorAlert(false)}/> <br/> </>}
            <Form.Item
                name="laptopId"
                label="Laptop"
                rules={[
                    {
                        required: true,
                        message: 'Please select laptop!',
                    },
                ]}
            >
                <Select>
                    {laptops.map((laptop) => {
                            console.log(laptop)
                            return (
                                <Select.Option key={laptop._id}
                                               value={laptop._id}>{laptop.name}</Select.Option>
                            )
                    }
                    )}
                </Select>
            </Form.Item>
            <Form.Item
                name="price"
                label="Price"
            >
                <InputNumber className={"w-full"}/>
            </Form.Item>
            <Form.Item
                name="source"
                label="Source">
                <Select>
                    {SaleManager.getSourceList().map((source) =>
                        <Select.Option key={source}
                                       value={source}>{SaleManager.getSourceLabel(source)}</Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item
                name="deliveryType"
                label="Delivery type">
                <Select>
                    {SaleManager.getDeliveryList().map((delivery) =>
                        <Select.Option key={delivery}
                                       value={delivery}>{SaleManager.getDeliveryLabel(delivery)}</Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item
                name="ttn"
                label="TTN"
            >
                <Input/>
            </Form.Item>
        </Modal>
    )


}

CreateSaleModal.propTypes = {
    createModalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    handleReload: PropTypes.func.isRequired
}