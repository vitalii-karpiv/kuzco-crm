import * as XLSX from "xlsx";
import LaptopManager from "./laptop-manager.js";

const formatCapacity = (value) => {
  if (!value && value !== 0) {
    return "-";
  }
  return `${value} GB`;
};

const getBatteryInfo = (characteristics = {}) => {
  const battery = characteristics?.battery;
  if (battery === null || battery === undefined) {
    return "-";
  }
  return `${battery}%`;
};

const buildDisplayInfo = (characteristics = {}) => {
  const { screenSize, panelType, resolution } = characteristics || {};
  const parts = [];

  if (screenSize) {
    parts.push(`${screenSize}"`);
  }

  const panelLabel = LaptopManager.getPanelTypeLabel(panelType);
  if (panelLabel) {
    parts.push(panelLabel);
  }

  const resolutionLabel = LaptopManager.getResolutionLabel(resolution);
  if (resolutionLabel) {
    parts.push(resolutionLabel);
  }

  return parts.length ? parts.join(" / ") : "-";
};

const mapLaptopToRow = (laptop = {}) => {
  return {
    "Service Tag": laptop.serviceTag ?? "",
    Name: laptop.name ?? "",
    State: LaptopManager.getLaptopStateLabel(laptop.state) ?? laptop.state ?? "",
    Processor: laptop.characteristics?.processor ?? "",
    Videocard: laptop.characteristics?.videocard ?? "",
    RAM: formatCapacity(laptop.characteristics?.ram),
    SSD: formatCapacity(laptop.characteristics?.ssd),
    "Display Info": buildDisplayInfo(laptop.characteristics),
    Battery: getBatteryInfo(laptop.characteristics),
    Note: laptop.note ?? "",
  };
};

const exportToExcel = (laptops = []) => {
  if (!Array.isArray(laptops) || laptops.length === 0) {
    return false;
  }

  const rows = laptops.map(mapLaptopToRow);
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Laptops");
  const timestamp = new Date().toISOString().split("T")[0];
  XLSX.writeFile(workbook, `laptops-${timestamp}.xlsx`);
  return true;
};

const LaptopExportHelper = {
  exportToExcel,
  buildDisplayInfo,
  getBatteryInfo,
};

export default LaptopExportHelper;
