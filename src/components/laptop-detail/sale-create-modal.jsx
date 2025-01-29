import {Form, Input, Modal} from 'antd';
import PropTypes from 'prop-types';
import SaleService from "../../api/services/sale-service.js";
import CustomerService from "../../api/services/customer-service.js";
import {useNavigate} from "react-router-dom";

export default function SaleCreateModal({modalOpen, closeModal, laptop}) {

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onCreate = async (values) => {
        // create customer
        let customer;
        if (values.phone && values.pib) {
            customer = await CustomerService.createOrUpdate({phone: values.phone, pib: values.pib});
        }
        // create new sale
        let sale = await SaleService.create({laptopId: laptop._id, price: parseFloat(values.price), customerId: customer?._id });

        navigate(`/sales/saleDetail/${sale._id}`)
    };

    return (
        <Modal title="Create order"
               open={modalOpen}
               onCancel={closeModal}
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
            <Form.Item
                name="pib"
                label="ПІБ"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="price"
                label="Price"
                rules={[
                    {
                        required: true,
                        message: 'Please define price!',
                    },
                ]}>
                <Input defaultValue={laptop?.sellPrice}/>
            </Form.Item>
        </Modal>
    )


}

SaleCreateModal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    laptop: PropTypes.object.isRequired,
}