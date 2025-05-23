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
const COUNTERPARTY_LIST = ["revasevych","karpiv", "glukhan"];

const COUNTERPARTY_COLOURS = {
    "revasevych": "magenta",
    "karpiv": "volcano",
    "glukhan": "purple",
}

const COUNTERPARTY_COLOURS_LABELS = {
    "revasevych": "Revasevych",
    "karpiv": "Karpiv",
    "glukhan": "Glukhan",
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

    getCounterpartyList() {
        return COUNTERPARTY_LIST
    }

    getCounterpartyColor(counterparty) {
        return COUNTERPARTY_COLOURS[counterparty];
    }

    getCounterpartyLabel(counterparty) {
        return COUNTERPARTY_COLOURS_LABELS[counterparty];
    }
}


const orderManager = new OrderManager();
export default orderManager;