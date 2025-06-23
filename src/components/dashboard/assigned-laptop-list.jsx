import PropTypes from 'prop-types';
import {Card, Typography} from "antd";
import LaptopStateTag from "../common/laptop-state-tag.jsx";
import {Link} from "react-router-dom";

export default function AssignedLaptopList({laptops}) {
    return (
        <Card className={"w-2/4 ml-1"}>
            <Typography.Title level={4}>Assigned on you</Typography.Title>
            <ol className={"list-disc list-inside space-y-1"}>
                {laptops.map((laptop) => (<li key={laptop.code}>
                    <Link target={"_blank"} to={`/laptops/laptopDetail/${laptop._id}`} className={"bg-blue-50 rounded p-1"}><Typography.Text code>{laptop.code}</Typography.Text> {laptop.name} <LaptopStateTag state={laptop.state} /></Link>
                </li>))}
            </ol>
        </Card>
    )
}

AssignedLaptopList.propTypes = {
    laptops: PropTypes.array.isRequired,
}
