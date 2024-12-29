import {useEffect, useState} from "react";
import Loading from "../components/loading.jsx";
import SaleService from "../api/services/sale-service.js";
import {useParams} from "react-router-dom";
import {Card, Typography} from "antd";
import DateView from "../components/date-view.jsx";
import LaptopService from "../api/services/laptop-service.js";

export default function SaleDetail() {
    let {id} = useParams();

    const [sale, setSale] = useState();
    const [laptop, setLaptop] = useState();

    useEffect(() => {
        loadSale();
    }, []);

    useEffect(() => {
        if (sale) {
            loadLaptop();
        }
    }, [sale]);

    async function loadSale() {
        const salesDtoOut = await SaleService.get(id);
        setSale(salesDtoOut);
    }

    async function loadLaptop() {
        const laptopDtoOut = await LaptopService.get(sale.laptopId);
        setLaptop(laptopDtoOut);
    }


    if (!sale) {
        return <Loading/>;
    }

    return (
    <div className={"block w-full mx-5"}>
        <header className={"flex justify-between align-middle"}>
            <Typography.Title level={3}>{laptop?.name}</Typography.Title>
        </header>
        <div className={"flex mb-3"}>
            <Card bordered={false} hoverable={true} className={"w-full"}>
                Price: {sale.price} <br/>
                Date: <DateView dateStr={sale.date}/> <br/>
                Source: {sale.source} <br/>
                deliveryType: {sale.deliveryType} <br/>
                ttn: {sale.ttn} <br/>
                state: {sale.state} <br/>
            </Card>
        </div>
    </div>
    )
}