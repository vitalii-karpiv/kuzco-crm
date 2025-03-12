import {useEffect, useState} from "react";
import {Button, Table} from "antd";
import Loading from "../components/loading.jsx";
import SaleService from "../api/services/sale-service.js";
import SalesTableHeader from "../components/sale/sales-table-header.jsx";
import CreateSaleModal from "../components/sale/create-sale-modal.jsx";
import DateView from "../components/date-view.jsx";
import LaptopService from "../api/services/laptop-service.js";
import {DeleteOutlined, SearchOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import SaleStateTag from "../components/common/sale-state-tag.jsx";
import FilterAndSorterBar from "../components/sale/filter-and-sorter-bar.jsx";

export default function Sales() {
    const [sales, setSales] = useState();
    const [laptops, setLaptops] = useState();
    const [filters, setFilters] = useState({});
    const [sorters, setSorters] = useState({date: "desc"});
    const [shouldLoadLaptops, setShouldLoadLaptops] = useState(true);
    const navigate = useNavigate();
    const [createModalOpen, setCreateModalOpen] = useState(false);

    useEffect(() => {
        loadSales();
    }, [sorters, filters]);

    useEffect(() => {
        if (sales?.length && shouldLoadLaptops) {
            loadLaptops();
        }
    }, [sales]);

    useEffect(() => {
        if (laptops?.length) {
            setLaptopNames();
        }
    }, [laptops]);

    async function loadSales() {
        const salesDtoOut = await SaleService.list({...filters, sorters});
        setSales(salesDtoOut.itemList);
        setShouldLoadLaptops(true);
    }

    async function loadLaptops() {
        const laptopsDtoOut = await LaptopService.list({idList: sales.map(sale => sale.laptopId)});
        setLaptops(laptopsDtoOut.itemList);
    }

    function setLaptopNames() {
        if (!laptops) return;
        setShouldLoadLaptops(false);
        const updatedSales = sales.map(sale => {
            const laptop = laptops.find(laptop => laptop._id === sale.laptopId);
            sale.laptopName = laptop.name;
            return sale;
        });
        setSales(updatedSales);
    }

    const getColumns = () => {
        return [
            {
                title: 'Code',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: 'Laptop name',
                dataIndex: 'laptopName',
                key: 'laptopName',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                render: (date) => <DateView dateStr={date}/>,
            },
            {
                title: 'Source',
                dataIndex: 'source',
                key: 'source',
            },
            {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
                render: (state) => <SaleStateTag state={state} />
            },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: (record) => {
                    return <div className={"w-full flex justify-evenly"}>
                        <Button onClick={() => navigate(`saleDetail/${record._id}`)} shape="circle" icon={<SearchOutlined />} />
                        <Button onClick={() => console.log(`delete ${record._id}`)} shape="circle" icon={<DeleteOutlined />} />
                    </div>
                },
            },
        ]
    }


    if (!sales) {
        return <Loading/>;
    }
    return (
        <div className={"flex-col w-full"}>
            <FilterAndSorterBar filters={filters} setFilters={setFilters} sorters={sorters} setSorters={setSorters} />
            <Table
                className={"ml-3 w-full"}
                dataSource={sales}
                size={"small"}
                columns={getColumns()}
                title={() => <SalesTableHeader onClick={() => setCreateModalOpen(true)}/>}
            />
            {createModalOpen &&
                <CreateSaleModal createModalOpen={createModalOpen} onClose={() => setCreateModalOpen(false)}
                                 onReload={loadSales}/>}
        </div>
    )
}