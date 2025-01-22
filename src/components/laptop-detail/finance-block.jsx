import {Card, InputNumber, Typography} from "antd";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import LaptopService from "../../api/services/laptop-service.js";
import FinanceService from "../../api/services/finance-service.js";
import PriceView from "../price-view.jsx";


export default function FinanceBlock({laptop, setLaptop}) {
    const [editLimitPrice, setEditLimitPrice] = useState(false);
    const [editSellPrice, setEditSellPrice] = useState(false);
    const [costPrice, setCostPrice] = useState(0);

    useEffect(() => {
        addCostPrice();
    }, []);

    async function addCostPrice() {
        const price = await FinanceService.getCostPricePerLaptop(laptop.orderId);
        setCostPrice(price);
    }

    return (
        <Card bordered={false} hoverable={true} className={"w-2/4 mx-2"}>
            <div className={"flex justify-between align-middle"}>
                <Typography.Title level={4}>Finances</Typography.Title>
            </div>

            <Typography.Text className={"block p-2 rounded bg-slate-300"}>
                <span>Собівартість: </span>
                <PriceView amount={costPrice}/>
            </Typography.Text>

            <PriceInput label={"Limit price"} editMode={editLimitPrice} setEditMode={setEditLimitPrice} laptop={laptop} setLaptop={setLaptop} property={"limitPrice"} type={"warning"} />
            <PriceInput label={"Sell price"} editMode={editSellPrice} setEditMode={setEditSellPrice} laptop={laptop} setLaptop={setLaptop} property={"sellPrice"} type={"success"}/>
        </Card>
    )

}

function PriceInput({label, editMode, setEditMode, laptop, setLaptop, property}) {

    async function handlePriceUpdate(value) {
        const newPrice = parseFloat(value);
        if (newPrice === laptop[property]) {
            setEditMode(false);
            return;
        }
        const updated = await LaptopService.update({id: laptop._id, [property]: parseFloat(value)});
        setLaptop(updated);
        setEditMode(false);
    }

    function showPrice(price) {
        if (price > 999) {
            return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        return price;
    }

    return (
        <Typography.Text className={"block p-2 my-5 rounded bg-slate-300"} onClick={() => setEditMode(true)}>
            <span>{label}: </span>
            {
                editMode ?
                    <InputNumber autoFocus size={"small"} className={"w-56"} defaultValue={laptop[property]} onBlur={(event) => handlePriceUpdate(event.target.value)} onPressEnter={(event) => handlePriceUpdate(event.target.value)}  /> :
                    <Typography.Text className={"text-green-800"} keyboard strong>{showPrice(laptop[property])} грн</Typography.Text>
            }
        </Typography.Text>
    )
}

FinanceBlock.propTypes = {
    laptop: PropTypes.object.isRequired,
    setLaptop: PropTypes.func.isRequired,
}

PriceInput.propTypes = {
    laptop: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    editMode: PropTypes.bool.isRequired,
    setEditMode: PropTypes.func.isRequired,
    setLaptop: PropTypes.func.isRequired,
    property: PropTypes.string.isRequired,
}