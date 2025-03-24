import {Card, Typography} from "antd";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LaptopService from "../../api/services/laptop-service.js";
import {useNavigate} from "react-router-dom";
import LaptopStateTag from "../common/laptop-state-tag.jsx";

export default function LaptopDetail({sale}) {

    const [laptop, setLaptop] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        loadLaptop();
    }, [sale._id]);

    async function loadLaptop() {
        const laptop = await LaptopService.get(sale.laptopId);
        setLaptop(laptop);
        setIsLoading(false)
    }

    return (
        <Card bordered={false} hoverable={true} className={""} loading={isLoading}>
            <Typography.Title level={4}>Laptop details</Typography.Title>
            <div className={"flex"}>
                <div className={"flex-col mr-5"}>
                    Code: <Typography.Text code onClick={() => navigate(`/laptops/laptopDetail/${laptop._id}`)}>{laptop?.code || "-"}</Typography.Text> <br/>
                    Title: {laptop?.name || "-"} <br/>
                </div>
                <div className={"flex-col"}>
                    State: <LaptopStateTag state={laptop?.state} /> <br/>
                    ServiceTag: {laptop?.serviceTag || "-"} <br/>
                </div>
            </div>
        </Card>
    )
}

LaptopDetail.propTypes = {
    sale: PropTypes.object.isRequired,
}