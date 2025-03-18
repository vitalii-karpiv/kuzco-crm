import PropTypes from 'prop-types';
import {Card, Typography} from "antd";
import LaptopStateTag from "../common/laptop-state-tag.jsx";

export default function AssignedLaptopList({laptops}) {
    return (
        <Card className={"w-2/4 ml-1"}>
            <Typography.Title level={4}>Assigned on you</Typography.Title>
            <ol className={"list-disc list-inside"}>
                {laptops.map((laptop) => (<li key={laptop.code}>
                    <Typography.Text code>{laptop.code}</Typography.Text> {laptop.name} <LaptopStateTag state={laptop.state} />
                </li>))}
            </ol>
        </Card>
    )
}

AssignedLaptopList.propTypes = {
    laptops: PropTypes.array.isRequired,
}
