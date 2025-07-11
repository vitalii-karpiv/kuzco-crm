import { Menu } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCompass,
  faLaptop,
  faShoppingCart,
  faMoneyBill,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

export default function MainMenu() {
  const items = [
    {
      key: "dashboard",
      label: <Link to={"dashboard"}>Dashboard</Link>,
      icon: <FontAwesomeIcon icon={faCompass} />,
    },
    {
      key: "orders",
      label: <Link to={"orders"}>Orders</Link>,
      icon: <FontAwesomeIcon icon={faBox} />,
    },
    {
      key: "laptops",
      label: <Link to={"laptops"}>Laptops</Link>,
      icon: <FontAwesomeIcon icon={faLaptop} />,
    },
    {
      key: "sales",
      label: <Link to={"sales"}>Sales</Link>,
      icon: <FontAwesomeIcon icon={faShoppingCart} />,
    },
    {
      key: "finances",
      label: <Link to={"finances"}>Finances</Link>,
      icon: <FontAwesomeIcon icon={faMoneyBill} />,
    },
    {
      key: "inventory",
      label: <Link to={"inventory"}>Inventory</Link>,
      icon: <FontAwesomeIcon icon={faWarehouse} />,
    },
  ];

  return (
    <Menu
      items={items}
      style={{
        boxShadow: "none",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
      className={"h-full rounded"}
      defaultOpenKeys={["dashboard"]}
    />
  );
}
