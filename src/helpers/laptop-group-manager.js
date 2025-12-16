const LAPTOP_GROUP_STATE_LIST = ["preparing", "published"];

const LAPTOP_GROUP_STATE_LABEL_MAP = {
  preparing: "Preparing",
  published: "Published",
};

const LAPTOP_GROUP_STATE_COLOR_MAP = {
  preparing: "orange",
  published: "green",
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
