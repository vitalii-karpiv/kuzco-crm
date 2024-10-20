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

class StockManager {

    getStockTypeList() {
        return STOCK_TYPE_LIST
    }

    getStockTypeMap() {
        return STOCK_TYPE_MAP;
    }
}


const stockManager = new StockManager();
export default stockManager;