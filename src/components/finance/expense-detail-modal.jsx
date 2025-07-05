import {Button, Divider, InputNumber, message, Modal, Select, Typography} from "antd";
import PropTypes from "prop-types";
import ExpenseAmountView from "../expense-amount-view.jsx";
import DateView from "../date-view.jsx";
import {useUserContext} from "../user-context.jsx";
import ExpenseManager from "../../helpers/expense-manager.js";
import {faPenToSquare, faArrowsSplitUpAndLeft, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import ExpenseService from "../../api/services/expense-service.js";

export default function ExpenseDetailModal({expense: externalExpense, orders, open, onClose}) {

    const {users} = useUserContext();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSplit, setShowSplit] = useState(false);
    const [expense, setExpense] = useState(externalExpense);

    const [splitCount, setSplitCount] = useState(2);
    const [splitAmounts, setSplitAmounts] = useState([0, 0]);

    const cardOwner = users.find(user => user._id === expense.cardOwner)
    const order = orders.find(order => order._id === expense.orderId)
    const total = splitAmounts.reduce((sum, val) => sum + val, 0);
    const isSplitValid = total === expense.amount / -100;

    async function handleUpdate() {
        setIsLoading(true);
        try {
            await ExpenseService.update({...expense, id: expense._id})
        } catch (e) {
            console.error(e);
            message.error('Failed to update expense!')
        } finally {
            setIsLoading(false);
        }
        setIsEditing(false)
    }

    async function handleDelete() {
        setIsLoading(true);
        try {
            await ExpenseService.delete(expense._id);
            message.success('Expense deleted!');
        } catch (e) {
            console.error(e);
            message.error('Failed to delete expense!')
        } finally {
            setIsLoading(false);
            onClose();
        }
    }

    async function handleSplitSave() {
        if (showSplit === false) {
            setShowSplit(true)
            return;
        }
        setIsLoading(true);
        // Create new expenses
        for (let i = 1; i < splitAmounts.length; i++) {
            await ExpenseService.create({
                ...expense,
                amount: splitAmounts[i] * -100,
                time: expense.time + i
            })
        }
        // Update current expense
        await ExpenseService.update({...expense, id: expense._id, amount: splitAmounts[0] * -100})
        // Show a success message
        setIsLoading(false);
        message.success('Expense split!');
        onClose();
    }

    function handleSplitCountChange(value) {
        const count = Number(value) || 0;
        setSplitCount(count);
        setSplitAmounts(Array(count).fill(0));
    }

    function updateAmount(index, value) {
        const updated = [...splitAmounts];
        updated[index] = Number(value) || 0;
        setSplitAmounts(updated);
    }

    return (
        <Modal open={open} title={"Expense Detail"} onCancel={onClose}
               width={800}
               footer={(_, {CancelBtn}) => (
                   <>
                       <CancelBtn/>
                       <Button loading={isLoading} icon={<FontAwesomeIcon icon={faPenToSquare}/>} onClick={() => {
                           isEditing ? handleUpdate() : setIsEditing(true)
                       }}>{isEditing ? "Save" : "Edit"}</Button>
                       <Button disabled={isLoading} className={"bg-red-500 text-white"} onClick={handleDelete}
                               icon={<FontAwesomeIcon icon={faTrash}/>}>Delete</Button>
                       <Button disabled={isLoading || (!isSplitValid && showSplit)} className={"bg-blue-500 text-white"}
                               onClick={handleSplitSave}
                               icon={<FontAwesomeIcon
                                   icon={faArrowsSplitUpAndLeft}/>}>{showSplit ? "Save" : "Split"}</Button>
                   </>
               )}
        >
            <div className={"flex flex-col space-y-2 mb-5"}>
                <div className={"flex w-full"}>
                    <p className={"w-1/3"}>💸 Amount: </p>
                    <p className={"w-2/3"}><ExpenseAmountView amount={String(expense.amount)}/></p>
                </div>
                <div className={"flex w-full"}>
                    <p className={"w-1/3"}>💬 Description: </p>
                    <p className={"w-2/3"}>{expense.description}</p>
                </div>
                <div className={"flex w-full"}>
                    <p className={"w-1/3"}>⏱️ Time: </p>
                    <p className={"w-2/3"}><DateView dateStr={new Date(parseInt(expense.time) * 1000).toISOString()}
                                                     showTime/></p>
                </div>
                <div className={"flex w-full"}>
                    <p className={"w-1/3"}>👨🏻‍💼 Card owner: </p>
                    <p className={"w-2/3"}>{cardOwner?.name} {cardOwner?.surname}</p>
                </div>
                <div className={"flex w-full"}>
                    <p className={"w-1/3"}>⁉️ Type: </p>
                    {isEditing ?
                        <Select
                            className={"w-1/3"}
                            value={ExpenseManager.getExpenseTypeLabel(expense.type)}
                            onChange={(type) => setExpense({
                                ...expense,
                                type
                            })}
                        >
                            {ExpenseManager.getExpenseTypeList().map(type => <Select.Option key={type}
                                                                                            value={type}>{ExpenseManager.getExpenseTypeLabel(type)}</Select.Option>)}
                        </Select> :
                        <p>{ExpenseManager.getExpenseTypeLabel(expense?.type)}</p>
                    }
                </div>
                <div className={"flex w-full"}>
                    <p className={"w-1/3"}>📦 Order: </p>
                    {isEditing ?
                        <Select
                            className={"w-2/3"}
                            value={expense.orderId}
                            onChange={(orderId) => setExpense({
                                ...expense,
                                orderId
                            })}
                            showSearch
                            filterOption={(input, option) => {
                                return input && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }}

                        >
                            {orders.map(order => <Select.Option key={order._id}
                                                                value={order._id}>{order.name}</Select.Option>)}
                        </Select>
                        :
                        <p className={"w-2/3"}>
                            {order ? (
                                <>
                                    <Typography.Text code>{order.code}</Typography.Text>
                                    <br/>
                                    {order.name}
                                </>
                            ) : (
                                "—"
                            )}
                        </p>
                    }
                </div>
            </div>
            {/* SPLIT LOGIC */}
            {showSplit && (
                <>
                    <Divider/>

                    <div className="flex items-center gap-2 mb-2">
                        <p className="mr-2">Number of splits:</p>
                        <InputNumber
                            min={2}
                            value={splitCount}
                            onChange={handleSplitCountChange}
                            size="small"
                        />
                        <Typography.Text className={"text-xs"} type={"danger"}>*first split is the original
                            expense</Typography.Text>
                    </div>

                    <div className="flex flex-col gap-2">
                        {splitAmounts.map((amount, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <p className="mr-2">Split #{index + 1}:</p>
                                <InputNumber
                                    value={amount}
                                    min={0}
                                    onChange={(val) => updateAmount(index, val)}
                                    size="small"
                                />
                            </div>
                        ))}
                    </div>

                    <Divider/>

                    <p>
                        Total: {total} / Original: {expense.amount / -100}
                        {!isSplitValid && <span style={{color: "red", marginLeft: 8}}>(Mismatch)</span>}
                    </p>
                </>
            )}
        </Modal>
    )

}

ExpenseDetailModal.propTypes = {
    expense: PropTypes.object.isRequired, // expense detail object to show details
    orders: PropTypes.array.isRequired, // List of orders to show in the modal
    open: PropTypes.bool.isRequired, // Whether the modal is open
    onClose: PropTypes.func.isRequired, // Function to call when the modal is closed
}