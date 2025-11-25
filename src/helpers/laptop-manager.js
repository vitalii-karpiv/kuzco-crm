const BATTERY_WEAR_LIST = ["excellent", "good", "fair", "poor"];

const BATTERY_WEAR_LABEL_MAP = {
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
  poor: "Poor",
};

const BATTERY_WEAR_COLOR_MAP = {
  excellent: "green",
  good: "blue",
  fair: "orange",
  poor: "red",
};

const LAPTOP_CONDITION_LIST = {
  A_PLUS: "a+",
  A: "a",
  B: "b",
  C: "c",
};

const LAPTOP_CONDITION_LABEL_MAP = {
  "a+": "A+",
  a: "A",
  b: "B",
  c: "C",
};

const LAPTOP_CONDITION_COLOR_MAP = {
  "a+": "green",
  a: "blue",
  b: "orange",
  c: "red",
};

const LAPTOP_STATE_LIST = [
  "new",
  "toService",
  "toTest",
  "toPhotoSession",
  "toPublish",
  "selling",
  "waitingForDelivery",
  "delivering",
  "done",
];
const RESOLUTION_LIST = ["hd", "fhd", "qhd", "uhd"];
const PANEL_TYPE_LIST = ["tn", "ips", "oled"];
const REFRESH_RATE_LIST = ["60", "120", "144", "240"];
const PORT_LIST = [
  "TYPE-C",
  "HDMI",
  "USB-A",
  "USB-B",
  "USB Mini",
  "USB Micro",
  "Jack",
  "MicroSD",
  "SD Card",
  "Ethernet",
  "VGA",
  "DVI",
  "DisplayPort",
  "Thunderbolt",
  "Lightning",
  "Coaxial",
  "RCA",
  "Optical Audio (TOSLINK)",
];

const REFRESH_RATE_LABEL_MAP = {
  60: "60 Hz",
  120: "120 Hz",
  144: "144 Hz",
  240: "240 Hz",
};

const RESOLUTION_LABEL_MAP = {
  hd: "HD (1280x720)",
  fhd: "Full HD (1920x1080)",
  qhd: "Quad HD 2K (2560x1440)",
  uhd: "Ultra HD 4K (3840x2160)",
};

const LAPTOP_STATE_LABEL_MAP = {
  new: "New",
  toService: "To service",
  toTest: "To test",
  toPhotoSession: "To photo session",
  toPublish: "To publish",
  selling: "Selling",
  waitingForDelivery: "Waiting for delivery",
  delivering: "Delivering",
  done: "Done",
};

const LAPTOP_STATE_COLOR_MAP = {
  new: "magenta",
  toService: "red",
  toTest: "volcano",
  toPhotoSession: "orange",
  toPublish: "gold",
  selling: "lime",
  waitingForDelivery: "cyan",
  delivering: "blue",
  done: "green",
};

const LAPTOP_STATE_MAP = {
  NEW: "new",
  TO_SERVICE: "toService",
  TO_TEST: "toTest",
  TO_PHOTO_SESSION: "toPhotoSession",
  TO_PUBLISH: "toPublish",
  SELLING: "selling",
  WAITING_FOR_DELIVERY: "waitingForDelivery",
  DELIVERING: "delivering",
  DONE: "done",
};

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
};

class LaptopManager {
  getLaptopStateLabel(state) {
    return LAPTOP_STATE_LABEL_MAP[state];
  }

  getLaptopStateColor(state) {
    return LAPTOP_STATE_COLOR_MAP[state];
  }

  getLaptopStateList() {
    return LAPTOP_STATE_LIST;
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

  getResolutionLabel(resolution) {
    if (!resolution) {
      return undefined;
    }
    return RESOLUTION_LABEL_MAP[resolution] ?? resolution;
  }

  getPanelTypeLabel(panelType) {
    if (!panelType) {
      return undefined;
    }
    return panelType.toUpperCase();
  }

  getResolutionListOptions() {
    return RESOLUTION_LIST.map((resolution) => {
      return {
        label: this.getResolutionLabel(resolution),
        value: resolution,
      };
    });
  }

  getRefreshRateListOptions() {
    return REFRESH_RATE_LIST.map((refreshRate) => {
      return {
        label: REFRESH_RATE_LABEL_MAP[refreshRate],
        value: refreshRate,
      };
    });
  }

  getPanelTypeListOptions() {
    return PANEL_TYPE_LIST.map((panelType) => {
      return {
        label: this.getPanelTypeLabel(panelType),
        value: panelType,
      };
    });
  }

  getPortsListOptions() {
    return PORT_LIST.map((port) => {
      return {
        label: port,
        value: port,
      };
    });
  }

  getLaptopConditionLabel(condition) {
    if (!condition) {
      return undefined;
    }
    return LAPTOP_CONDITION_LABEL_MAP[condition] ?? condition;
  }

  getLaptopConditionListOptions() {
    return Object.values(LAPTOP_CONDITION_LIST).map((condition) => ({
      label: this.getLaptopConditionLabel(condition),
      value: condition,
    }));
  }

  getLaptopConditionColor(condition) {
    if (!condition) {
      return undefined;
    }
    return LAPTOP_CONDITION_COLOR_MAP[condition] ?? "default";
  }

  getBatteryWearLabel(level) {
    if (!level) {
      return undefined;
    }
    return BATTERY_WEAR_LABEL_MAP[level] ?? level;
  }

  getBatteryWearColor(level) {
    if (!level) {
      return undefined;
    }
    return BATTERY_WEAR_COLOR_MAP[level] ?? "default";
  }

  getBatteryWearListOptions() {
    return BATTERY_WEAR_LIST.map((level) => ({
      label: this.getBatteryWearLabel(level),
      value: level,
    }));
  }
}

const laptopManager = new LaptopManager();
export default laptopManager;
