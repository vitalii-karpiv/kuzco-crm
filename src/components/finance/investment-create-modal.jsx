import {DatePicker, Form, Input, message, Modal, Select} from 'antd';
import PropTypes from 'prop-types';
import FinanceService from "../../api/services/finance-service.js";
import {useUserContext} from "../user-context.jsx";

export default function InvestmentCreateModal({open, closeCreateModal}) {

    const [form] = Form.useForm();
    const {users: userList} = useUserContext();

    const onCreate = async (values) => {
        try {
            await FinanceService.createInvestment({...values, amount: parseFloat(values.amount)});
        } catch (error) {
            message.error("Failed to create investment");
        } finally {
            closeCreateModal();
        }
    };

    return (
        <Modal title="Create investment"
               open={open}
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
            <Form.Item name="amount" label="Amount" rules={[
                {
                    required: true,
                    message: 'Please input amount!',
                },
            ]}>
                <Input type="number"/>
            </Form.Item>
            <Form.Item name="date" label="Date" required={true} rules={[
                {
                    required: true,
                    message: 'Please input date of investment!',
                },
            ]}>
                <DatePicker className={"w-full"}/>
            </Form.Item>
            <Form.Item
                name="userId"
                label="Investor"
            >
                {userList && <Select>
                    {userList.map((user) =>
                        <Select.Option key={user._id}
                                       value={user._id}>{user.name} {user.surname}</Select.Option>
                    )}
                </Select>}
            </Form.Item>
        </Modal>
    )


}

InvestmentCreateModal.propTypes = {
    open: PropTypes.bool.isRequired,
    closeCreateModal: PropTypes.func.isRequired,
}