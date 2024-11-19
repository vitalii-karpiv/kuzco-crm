import {useEffect, useState} from "react";
import {Table} from "antd";
import Loading from "../components/loading.jsx";
import SaleService from "../api/services/sale-service.js";
import SalesTableHeader from "../components/sale/sales-table-header.jsx";
import CreateSaleModal from "../components/sale/create-sale-modal.jsx";

export default function Sales() {
    const [sales, setSales] = useState();

    const [createModalOpen, setCreateModalOpen] = useState(false);

    useEffect(() => {
        loadSales();
    }, []);

    async function loadSales() {
        const salesDtoOut = await SaleService.list({});
        setSales(salesDtoOut.itemList);
    }

    const getColumns = () => {
        return [
            {
                title: 'Source',
                dataIndex: 'source',
                key: 'source',
            },
            {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
            },
        ]
    }


    if (!sales) {
        return <Loading/>;
    }
    return (
        <>
            <Table
                className={"ml-3 w-full"}
                dataSource={sales}
                columns={getColumns()}
                title={() => <SalesTableHeader onClick={() => setCreateModalOpen(true)}/>}
            />
            {createModalOpen && <CreateSaleModal createModalOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} onReload={loadSales}/>}
        </>
    )
}