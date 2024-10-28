import {useEffect, useState} from "react";
import Loading from "../components/loading.jsx";
import SaleService from "../api/services/sale-service.js";
import {useParams} from "react-router-dom";

export default function SaleDetail() {
    let {id} = useParams();

    const [sale, setSale] = useState();

    useEffect(() => {
        loadSale();
    }, []);

    async function loadSale() {
        const salesDtoOut = await SaleService.get(id);
        setSale(salesDtoOut);
    }


    if (!sale) {
        return <Loading/>;
    }
    return (
        <h1>{sale._id}</h1>
    )
}