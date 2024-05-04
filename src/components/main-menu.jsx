import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBox, faCompass, faLaptop, faTruckField} from '@fortawesome/free-solid-svg-icons'

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
            key: 'suppliers',
            label: 'Suppliers',
            icon: <FontAwesomeIcon icon={faTruckField} />
        },
    ];

    const onClick = (e) => {
        navigate(`/${e.key}`)
        console.log('click ', e);
    };


    return <Menu
        onClick={onClick}
        items={items}
        className={"w-1/4 h-80 rounded drop-shadow-md"}
        mode="inline"
        defaultOpenKeys={['dashboard']}
    />
}