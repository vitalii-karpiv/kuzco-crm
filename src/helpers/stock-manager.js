const STOCK_TYPE_LIST = ["ram", "hdd", "ssd", "battery", "screen", "flex-cable", "keyboard", "motherboard", "matrix", "charger"];

const STOCK_TYPE_MAP = {
    RAM :"ram",
    HDD : "hdd",
    SSD : "ssd",
    BATTERY: "battery",
    SCREEN : "screen",
    FLEX_CABLE : "flex-cable",
    KEYBOARD : "keyboard",
    MOTHERBOARD : "motherboard",
    MATRIX : "matrix",
    CHARGER : "charger",
}

const STOCK_TYPE_LABEL_MAP = {
    ram :"RAM",
    hdd : "HDD",
    ssd : "SSD",
    battery: "Battery",
    screen : "Screen",
    "flex-cable" : "Flex-cable",
    keyboard : "Keyboard",
    motherboard : "Motherboard",
    matrix : "Matrix",
    charger : "Charger",
}

const STOCK_STATE_MAP = {
    FREE : "free",
    BOOKED : "booked",
}

const STOCK_STATE_LABEL_MAP = {
    free : "Free",
    booked : "Booked",
}
const STOCK_STATE_COLOR_MAP = {
    free : "green",
    booked : "red",
}

class StockManager {

    getStockTypeList() {
        return STOCK_TYPE_LIST
    }

    getStockTypeMap() {
        return STOCK_TYPE_MAP;
    }

    getStockTypeLabel(stockType) {
        return STOCK_TYPE_LABEL_MAP[stockType]
    }

    getStockStateMap() {
        return STOCK_STATE_MAP;
    }

    getStockStateLabel(state) {
        return STOCK_STATE_LABEL_MAP[state];
    }

    getStockStateColor(state) {
        return STOCK_STATE_COLOR_MAP[state];
    }
}


const stockManager = new StockManager();
export default stockManager;