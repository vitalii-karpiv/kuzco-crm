import {useEffect, useState} from "react";
import {Table} from "antd";
import Loading from "../components/loading.jsx";
import StockService from "../api/services/stock-service.js";
import LaptopService from "../api/services/laptop-service.js";
import InventoryTableHeader from "../components/inventory/inventory-table-header.jsx";
import CreateStockModal from "../components/inventory/create-stock-modal.jsx";
import {useNavigate} from "react-router-dom";
import StockManager from "../helpers/stock-manager.js";

export default function Inventory() {
    const navigate = useNavigate();
    const [stocks, setStocks] = useState([]);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const loadedStocks = await loadStocks();
        let loadedLaptops = await loadLaptops(loadedStocks);
        prepareDataSource(loadedStocks, loadedLaptops);
    }

    function prepareDataSource(loadedStocks, loadedLaptops) {
        const newStocks = loadedStocks.map(stock => {
            return {
                ...stock,
                laptopName: loadedLaptops.find(laptop => laptop._id === stock.laptopId)?.name
            }
        });
        setStocks(newStocks);
    }

    async function loadStocks() {
        const stocksDto = await StockService.list({state: StockManager.getStockStateMap().FREE});
        return stocksDto.itemList;
    }

    async function loadLaptops(loadedStocks) {
        const laptops = await LaptopService.list({idList: Array.from(new Set(loadedStocks.map(stock => stock.laptopId)))});
        return laptops.itemList;
    }

    const getColumns = () => {
        return [
            {
                title: 'Title',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: 'Laptop name',
                dataIndex: 'laptopName',
                key: 'laptopName',
            },
        ]
    }

    if (stocks.length === 0) {
        return <Loading/>;
    }
    return (
        <>
            <Table
                rowKey="_id"
                className={"ml-3 w-full"}
                dataSource={stocks}
                size={"small"}
                bordered
                rowClassName={(record) => {
                    let commonClasses = "text-center text-white hover:text-black ";
                    if (record.state === StockManager.getStockStateMap().FREE) commonClasses += "bg-emerald-900"
                    else commonClasses += "bg-slate-800"
                    return commonClasses;
                }}
                columns={getColumns()}
                title={() => <InventoryTableHeader onClick={() => setOpenCreateModal(true)}/>}
                onRow={(record) => {
                    return {
                        onClick: () => {navigate(`stock/${record._id}`)},
                    };
                }}
            />

            {/* MODALS */}
            {openCreateModal && <CreateStockModal closeCreateModal={() => setOpenCreateModal(false)} createModalOpen={openCreateModal} handleReload={fetchData} />}
        </>
    )
}