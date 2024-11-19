const SALE_STATE_LIST = ["inUsa", "waitingForPayment", "delivering", "requireDocument", "taxPayed", "delivered", "sold"];
const DELIVERY_LIST = ["novapost", "ukrpost", "meest", "pickUp"];
const SOURCE_LIST = ["olx", "inst", "telegram", "tiktok", "prom", "website"];

const DELIVERY_LABELS = {
    "novapost": "Nova Poshta",
    "ukrpost": "UkrPoshta",
    "meest": "Meest",
    "pickUp": "Pick Up",
}

const SOURCE_LABELS = {
    "olx": "OLX",
    "inst": "Instagram",
    "telegram": "Telegram",
    "tiktok": "Tik Tok",
    "prom": "Prom",
    "website": "Website",
}

const SALE_STATES_COLORS = {
    "inUsa": "magenta",
    "waitingForPayment": "red",
    "delivering": "volcano",
    "requireDocument": "purple",
    "taxPayed": "cyan",
    "delivered": "green",
    "sold": "blue",
}

const SALE_STATES_COLORS_LABELS = {
    "inUsa": "In USA",
    "waitingForPayment": "Waiting for payment",
    "delivering": "Delivering",
    "requireDocument": "Require document",
    "taxPayed": "Tax Payed",
    "delivered": "Delivered",
    "sold": "Sold",
}

class SaleManager {

    getSaleStateList() {
        return SALE_STATE_LIST
    }

    getSaleStateColor(SALEState) {
        return SALE_STATES_COLORS[SALEState];
    }

    getSaleStateLabel(SALEState) {
        return SALE_STATES_COLORS_LABELS[SALEState];
    }

    getDeliveryList() {
        return DELIVERY_LIST;
    }

    getSourceList() {
        return SOURCE_LIST;
    }

    getDeliveryLabel(delivery) {
        return DELIVERY_LABELS[delivery];
    }

    getSourceLabel(source) {
        return SOURCE_LABELS[source];
    }
}


const saleManager = new SaleManager();
export default saleManager;