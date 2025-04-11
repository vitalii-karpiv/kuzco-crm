import {useEffect, useState} from "react";
import {Button, Table} from "antd";
import LaptopService from "../api/services/laptop-service.js";
import Loading from "../components/loading.jsx";
import {DeleteOutlined, SearchOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import LaptopsTableHeader from "../components/laptop/laptops-table-header.jsx";
import CreateLaptopModal from "../components/laptop/create-laptop-modal.jsx";
import LaptopStateTag from "../components/common/laptop-state-tag.jsx";
import SorterBar from "../components/laptop-detail/sorter-bar.jsx";
import FilterBar from "../components/laptop-detail/filter-bar.jsx";

export default function Laptops() {
    const [laptops, setLaptops] = useState();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({});
    const [sorters, setSorters] = useState({});
    const [createModalOpen, setCreateModalOpen] = useState(false);

    useEffect(() => {
        loadLaptops();
    }, [filters, sorters]);

    const closeCreateModal = () => {
        setCreateModalOpen(false);
    }

    async function loadLaptops() {
        const ordersDto = await LaptopService.list({...filters, sorters});
        setLaptops(ordersDto.itemList);
    }

    const getColumns = () => {
        return [
            {
                title: 'Code',
                dataIndex: 'code',
                key: 'code',
                // render: code => <Typography.Text code>{code}</Typography.Text>
            },
            {
                title: 'Title',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
                render: state =>  <LaptopStateTag state={state} />
            },
            {
                title: 'Limit Price',
                dataIndex: 'limitPrice',
                key: 'limitPrice',
            },
            {
                title: 'Sell Price',
                dataIndex: 'sellPrice',
                key: 'sellPrice',
            },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: (record) => {
                    return <div className={"w-full flex justify-evenly"}>
                        <Button onClick={() => navigate(`laptopDetail/${record._id}`)} shape="circle" icon={<SearchOutlined />} />
                        <Button onClick={() => console.log(`delete ${record._id}`)} shape="circle" icon={<DeleteOutlined />} />
                    </div>
                },
            },
        ]
    }


    if (!laptops) {
        return <Loading/>;
    }
    return (
        <div className={"w-full"}>
            <SorterBar sorters={sorters} setSorters={setSorters} />
            <FilterBar filters={filters} setFilters={setFilters}/>
            <Table
                className={"ml-3 w-full"}
                dataSource={laptops.map((laptop, index) => ({...laptop, key: index}))}
                size={"small"}
                columns={getColumns()}
                pagination={false}
                scroll={{y: 500}}
                onScroll={() => {
                    // TODO: load more data when scrolled to bottom
                }}
                key={"_id"}
                expandable={{
                    expandedRowRender: (laptop) => (
                        <div
                            className={"bg-amber-50 m-0"}
                        >
                            {`TODO: characteristics, ${laptop.name}`}
                        </div>
                    ),
                    rowExpandable: (laptop) => laptop.characteristics,
                }}
                title={() => <LaptopsTableHeader onClick={() => setCreateModalOpen(true)}/>}
            />
            {createModalOpen && <CreateLaptopModal createModalOpen={createModalOpen} onClose={closeCreateModal} onReload={loadLaptops}/>}
        </div>
    )
}