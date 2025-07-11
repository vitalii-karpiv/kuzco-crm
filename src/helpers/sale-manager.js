const SALE_STATE_LIST = ["new", "delivering", "done", "rejected"];
const DELIVERY_LIST = ["novapost", "ukrpost", "meest", "pickUp"];
const SOURCE_LIST = ["olx", "inst", "telegram", "tiktok", "prom", "website"];

const STATE_LABELS = {
  new: "New",
  delivering: "Delivering",
  done: "Done",
  rejected: "Rejected",
};

const STATE_COLORS = {
  new: "magenta",
  delivering: "cyan",
  done: "green",
  rejected: "red",
};

const DELIVERY_LABELS = {
  novapost: "Nova Poshta",
  ukrpost: "UkrPoshta",
  meest: "Meest",
  pickUp: "Local pick Up",
};

const SOURCE_LABELS = {
  olx: "OLX",
  inst: "Instagram",
  telegram: "Telegram",
  tiktok: "Tik Tok",
  prom: "Prom",
  website: "Website",
};

class SaleManager {
  getSaleStateList() {
    return SALE_STATE_LIST;
  }

  getStateLabel(state) {
    return STATE_LABELS[state];
  }

  getStateColor(state) {
    return STATE_COLORS[state];
  }

  getDeliveryList() {
    return DELIVERY_LIST;
  }

  getSourceList() {
    return SOURCE_LIST;
  }

  getSourceListOptions() {
    return SOURCE_LIST.map((source) => {
      return {
        label: SOURCE_LABELS[source],
        value: source,
      };
    });
  }

  getDeliveryTypeListOptions() {
    return DELIVERY_LIST.map((deliveryType) => {
      return {
        label: DELIVERY_LABELS[deliveryType],
        value: deliveryType,
      };
    });
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
