const LAPTOP_GROUP_STATE_LIST = ["preparing", "published", "service"];

const LAPTOP_GROUP_STATE_LABEL_MAP = {
  preparing: "Preparing",
  published: "Published",
  service: "Service",
};

const LAPTOP_GROUP_STATE_COLOR_MAP = {
  preparing: "orange",
  published: "green",
  service: "red",
};

class LaptopGroupManager {
  getLaptopGroupStateLabel(state) {
    return LAPTOP_GROUP_STATE_LABEL_MAP[state] || state;
  }

  getLaptopGroupStateColor(state) {
    return LAPTOP_GROUP_STATE_COLOR_MAP[state] || "default";
  }

  getLaptopGroupStateList() {
    return LAPTOP_GROUP_STATE_LIST;
  }
}

const laptopGroupManager = new LaptopGroupManager();
export default laptopGroupManager;
