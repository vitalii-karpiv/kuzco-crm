import {Modal, Form, Input, DatePicker, Select, Alert, Typography, TimePicker} from 'antd';
import OrderService from "../../api/services/order-service.js";
import {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import ExpenseManager from "../../helpers/expense-manager.js";
import UserService from "../../api/services/user-service.js";
import FinanceService from "../../api/services/finance-service.js";
import dayjs from "dayjs";

export default function ExpenseCreateModal({open, closeCreateModal, handleReload}) {

    const [form] = Form.useForm();

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [userList, setUserList] = useState([]);
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        loadUserList()
        loadOrderList()
    }, []);

    async function loadUserList() {
        const usersDto = await UserService.list();
        setUserList(usersDto);
    }

    async function loadOrderList() {
        const orderDto = await OrderService.list();
        setOrderList(orderDto.itemList);
    }

    const onCreate = async (values) => {
        console.log(values.cardOwner);
        const date = new Date(values.date.toDate())
        const time = new Date(values.time.toDate())
        time.setDate(date.getDate())
        values.amount = parseFloat(values.amount) * 100 * -1;
        values.time = parseFloat(parseFloat(time.getTime() / 1000).toFixed(0));
        try {
            await FinanceService.createExpense(values);
            await handleReload();
            closeCreateModal();
        } catch (e) {
            setShowErrorAlert(true);
        }
    };

    return (
        <Modal title="Create expense"
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
            {showErrorAlert && <> <Alert message="Failed to create order!" type="error" showIcon closable
                                         onClose={() => setShowErrorAlert(false)}/> <br/> </>}
            <Form.Item name="amount" label="Amount" rules={[
                {
                    required: true,
                    message: 'Please input amount of laptops!',
                },
            ]}>
                <Input type="number"/>
            </Form.Item>
            <Form.Item
                name="type"
                label="Type"
                rules={[
                    {
                        required: true,
                        message: 'Please input the type of expense!',
                    },
                ]}
            >
                <Select>
                    {ExpenseManager.getExpenseTypeList().map((type) =>
                        <Select.Option key={type}
                                       value={type}>{ExpenseManager.getExpenseTypeLabel(type)}</Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item name="date" label="Date" required={true} rules={[
                {
                    required: true,
                    message: 'Please input date of purchase!',
                },
            ]}>
                <DatePicker className={"w-full"}/>
            </Form.Item>

            <Form.Item name="time" label="Time" required={true}
                       rules={[
                           {
                               required: true,
                               message: 'Please input time of purchase!',
                           },
                       ]}
            >
                <TimePicker className={"w-full"} format={"HH:mm"}
                            defaultValue={dayjs(`${new Date().getHours()}:${new Date().getMinutes()}`, "HH:mm")}/>
            </Form.Item>
            <Form.Item
                name="orderId"
                label="Order"
            >
                {orderList && <Select>
                    {orderList.map((order) =>
                        <Select.Option key={order._id}
                                       value={order._id}><Typography.Text
                            code>{order.code}</Typography.Text> {order.name}</Select.Option>
                    )}
                </Select>}
            </Form.Item>
            <Form.Item
                name="cardOwner"
                label="Card owner"
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

ExpenseCreateModal.propTypes = {
    open: PropTypes.bool.isRequired,
    closeCreateModal: PropTypes.func.isRequired,
    handleReload: PropTypes.func.isRequired
}