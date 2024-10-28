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
}


const laptopManager = new LaptopManager();
export default laptopManager;