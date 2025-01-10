import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBox, faCompass, faLaptop, faShoppingCart, faMoneyBill, faWarehouse} from '@fortawesome/free-solid-svg-icons'

export default function MainMenu() {
    const navigate = useNavigate();
    const items = [
        {
            key: 'dashboard',
            label: 'Dashboard',
            icon: <FontAwesomeIcon icon={faCompass} />
        },
        {
            key: 'orders',
            label: 'Orders',
            icon: <FontAwesomeIcon icon={faBox} />
        },
        {
            key: 'laptops',
            label: 'Laptops',
            icon: <FontAwesomeIcon icon={faLaptop} />
        },
        {
            key: 'sales',
            label: 'Sales',
            icon: <FontAwesomeIcon icon={faShoppingCart} />
        },
        {
            key: 'finances',
            label: 'Finances',
            icon: <FontAwesomeIcon icon={faMoneyBill} />
        },
        {
            key: 'inventory',
            label: 'Inventory',
            icon: <FontAwesomeIcon icon={faWarehouse} />
        }
    ];

    const onClick = (e) => {
        navigate(`/${e.key}`)
    };


    return <Menu
        onClick={onClick}
        items={items}
        style={{
            boxShadow: "none",
            backgroundColor: "#fff",
            overflow: "hidden"
        }}
        className={"h-full rounded"}
        defaultOpenKeys={['dashboard']}
    />
}