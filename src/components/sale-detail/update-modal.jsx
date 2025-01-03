import {Alert, Form, Input, InputNumber, Modal, Select} from "antd";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import SaleService from "../../api/services/sale-service.js";
import LaptopService from "../../api/services/laptop-service.js";
import LaptopManager from "../../helpers/laptop-manager.js";
import SaleManager from "../../helpers/sale-manager.js";

export default function UpdateModal({open, onClose, sale}) {

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [form] = Form.useForm();

    const [laptops, setLaptops] = useState([]);

    useEffect(() => {
        loadActiveLaptops();
    }, []);

    async function loadActiveLaptops() {
        const laptopsDtoOut = await LaptopService.list({state: LaptopManager.getActiveStates()});
        setLaptops(laptopsDtoOut.itemList);
    }

    const onUpdate = async (values) => {
        try {
            await SaleService.update({...values, id: sale._id});
            onClose();
        } catch (e) {
            setShowErrorAlert(true);
        }
    }


    return (
        <Modal title="Create laptop"
               open={open}
               onCancel={onClose}
               okText="Update"
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
                       onFinish={(values) => onUpdate(values)}
                   >
                       {dom}
                   </Form>
               )}>
            {showErrorAlert && <> <Alert message="Failed to update sale!" type="error" showIcon closable
                                         onClose={() => setShowErrorAlert(false)}/> <br/> </>}
            <Form.Item
                name="laptopId"
                label="Laptop"
            >
                <Select defaultValue={sale.laptopId}>
                    {laptops.map((laptop) =>
                        <Select.Option key={laptop._id}
                                       value={laptop._id}>{laptop.name}</Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item
                name="source"
                label="Source"
            >
                <Select defaultValue={sale.source}>
                    {SaleManager.getSourceList().map((source) =>
                        <Select.Option key={source}
                                       value={source}>{source}</Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item
                name="deliveryType"
                label="Delivery Type"
            >
                <Select defaultValue={sale.deliveryType}>
                    {SaleManager.getDeliveryList().map((delivery) =>
                        <Select.Option key={delivery}
                                       value={delivery}>{delivery}</Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item
                name="price"
                label="Price"
            >
                <InputNumber defaultValue={sale.price}/>
            </Form.Item>
            <Form.Item
                name="ttn"
                label="TTN"
            >
                <Input defaultValue={sale.ttn}/>
            </Form.Item>
            {showErrorAlert && <> <Alert message="Failed to update sale!" type="error" showIcon closable onClose={() => setShowErrorAlert(false)}/> <br/> </>}
        </Modal>
    )
}

UpdateModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    sale: PropTypes.object.isRequired,
}