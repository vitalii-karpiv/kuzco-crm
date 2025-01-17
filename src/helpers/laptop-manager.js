const LAPTOP_STATE_LIST = ["new", "toService", "toTest", "toPhotoSession", "toPublish", "selling", "waitingForDelivery", "delivering", "done"];

const LAPTOP_STATE_MAP = {
    NEW :"new",
    TO_SERVICE : "toService",
    TO_TEST : "toTest",
    TO_PHOTO_SESSION: "toPhotoSession",
    TO_PUBLISH : "toPublish",
    SELLING : "selling",
    WAITING_FOR_DELIVERY : "waitingForDelivery",
    DELIVERING : "delivering",
    DONE : "done",
}

const ACTIVE_STATES = ["new", "toService", "toTest", "toPhotoSession", "toPublish", "selling"];

const TECH_CHECK_LABELS = {
    keyboard: "Keyboard",
    camera: "Camera",
    micro: "Micro",
    sound: "Sound",
    display: "Display",
    batteryTakeCharge: "Battery take charge",
    batteryHoldCharge: "Battery hold charge",
    ports: "Port",
    cooler: "Cooler",
    aidaStressTest: "Aida stress test",
    memTest: "Memtest",
}

class LaptopManager {

    getLaptopStateList() {
        return LAPTOP_STATE_LIST
    }

    getLaptopStateMap() {
        return LAPTOP_STATE_MAP;
    }

    getFinalStates() {
        return ["waitingForDelivery", "delivering", "done"];
    }

    getActiveStates() {
        return ACTIVE_STATES;
    }

    getTechCheckLabels(techCheck) {
        return TECH_CHECK_LABELS[techCheck];
    }
}


const laptopManager = new LaptopManager();
export default laptopManager;