import {useEffect, useState} from "react";
import {Table, Typography} from "antd";
import Loading from "../components/loading.jsx";
import StockService from "../api/services/stock-service.js";
import LaptopService from "../api/services/laptop-service.js";

export default function Inventory() {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const loadedStocks = await loadStocks();
            const loadedLaptops = await loadLaptops(loadedStocks);
            prepareDataSource(loadedStocks, loadedLaptops);
        }

        fetchData();
    }, []);

    function prepareDataSource(loadedStocks, loadedLaptops) {
        const newStocks = loadedStocks.map(stock => {
            return {
                ...stock,
                key: stock._id,
                laptopName: loadedLaptops.find(laptop => laptop._id === stock.laptopId)?.name
            }
        });
        setStocks(newStocks);
    }

    async function loadStocks() {
        const stocksDto = await StockService.list({});
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
        <Table
            className={"ml-3 w-full"}
            dataSource={stocks}
            columns={getColumns()}
            title={() => <Typography.Title level={3}>Inventory</Typography.Title>}
        />
    )
}