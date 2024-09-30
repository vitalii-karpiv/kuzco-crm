const ORDER_STATE_LIST = ["inUsa", "waitingForPayment", "delivering", "requireDocument", "taxPayed", "delivered", "sold"];

const ORDER_STATES_COLORS = {
    "inUsa": "magenta",
    "waitingForPayment": "red",
    "delivering": "volcano",
    "requireDocument": "purple",
    "taxPayed": "cyan",
    "delivered": "green",
    "sold": "blue",
}

const ORDER_STATES_COLORS_LABELS = {
    "inUsa": "In USA",
    "waitingForPayment": "Waiting for payment",
    "delivering": "Delivering",
    "requireDocument": "Require document",
    "taxPayed": "Tax Payed",
    "delivered": "Delivered",
    "sold": "Sold",
}

class OrderManager {

    getOrderStateList() {
        return ORDER_STATE_LIST
    }

    getOrderStateColor(orderState) {
        return ORDER_STATES_COLORS[orderState];
    }

    getOrderStateLabel(orderState) {
        return ORDER_STATES_COLORS_LABELS[orderState];
    }
    
    getFilterList() {
        return ORDER_STATE_LIST.map(state => { return {
            text: ORDER_STATES_COLORS_LABELS[state],
            value: state,
        }})
    }
}


const orderManager = new OrderManager();
export default orderManager;