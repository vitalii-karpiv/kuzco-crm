const SALE_STATE_LIST = ["new", "delivering", "done", "rejected"];
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

class SaleManager {

    getSaleStateList() {
        return SALE_STATE_LIST
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