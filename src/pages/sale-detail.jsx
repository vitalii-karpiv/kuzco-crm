import {useEffect, useState} from "react";
import Loading from "../components/loading.jsx";
import SaleService from "../api/services/sale-service.js";
import {useParams} from "react-router-dom";
import {Alert, Button, Card, Typography} from "antd";
import DateView from "../components/date-view.jsx";
import LaptopService from "../api/services/laptop-service.js";
import {EditOutlined} from "@ant-design/icons";
import UpdateModal from "../components/sale-detail/update-modal.jsx";

export default function SaleDetail() {
    let {id} = useParams();

    const [sale, setSale] = useState();
    const [laptop, setLaptop] = useState();
    const [showUpdateModal, setShowUpdateModal] = useState();
    const [showErrorAlert, setShowErrorAlert] = useState(false);

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

    async function setSaleState(state) {
        try {
            const updated = await SaleService.setState({id: sale._id, state});
            setSale(updated);
        } catch (e) {
            setShowErrorAlert(true);
        }
    }


    if (!sale) {
        return <Loading/>;
    }

    return (
        <div className={"block w-full mx-5"}>
            <header className={"flex justify-between align-middle"}>
                <Typography.Title level={3}>{laptop?.name}</Typography.Title>
                <div className={"flex"}>
                    {sale.state === "new" && <Button className={"bg-amber-400 mr-3"}
                                                     onClick={() => setSaleState("delivering")}>Delivering</Button>}
                    {sale.state === "delivering" && <div className={"flex justify-between align-middle"}>
                        <Button className={"bg-green-500 mr-3"} onClick={() => setSaleState("done")}>Done</Button>
                        <Button className={"bg-red-500 mr-3"} onClick={() => setSaleState("rejected")}>Rejected</Button>
                    </div>}
                    <Button icon={<EditOutlined/>} onClick={() => setShowUpdateModal(true)}>Edit</Button>
                </div>
            </header>
            <div className={"flex mb-3"}>
                <Card bordered={false} hoverable={true} className={"w-full"}>
                    Price: {sale.price} <br/>
                    Date: <DateView dateStr={sale.date}/> <br/>
                    Source: {sale.source} <br/>
                    DeliveryType: {sale.deliveryType} <br/>
                    TTN: {sale.ttn} <br/>
                    state: {sale.state} <br/>
                </Card>
            </div>

            {showUpdateModal &&
                <UpdateModal open={showUpdateModal} onClose={() => setShowUpdateModal(false)} sale={sale}/>}
            {showErrorAlert && <> <Alert message="Failed to update sale!" type="error" showIcon closable
                                         onClose={() => setShowErrorAlert(false)}/> <br/> </>}
        </div>
    )
}