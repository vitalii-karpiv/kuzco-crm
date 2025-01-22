import {useEffect, useState} from "react";
import {Button, Table} from "antd";
import LaptopService from "../api/services/laptop-service.js";
import Loading from "../components/loading.jsx";
import {DeleteOutlined, SearchOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import LaptopsTableHeader from "../components/laptop/laptops-table-header.jsx";
import CreateLaptopModal from "../components/laptop/create-laptop-modal.jsx";
import LaptopStateTag from "../components/common/laptop-state-tag.jsx";

export default function Laptops() {
    const [laptops, setLaptops] = useState();
    const navigate = useNavigate();

    const [createModalOpen, setCreateModalOpen] = useState(false);

    useEffect(() => {
        loadLaptops();
    }, []);

    const closeCreateModal = () => {
        setCreateModalOpen(false);
    }

    async function loadLaptops() {
        const ordersDto = await LaptopService.list({});
        setLaptops(ordersDto.itemList);
    }

    const getColumns = () => {
        return [
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
        <>
            <Table
                className={"ml-3 w-full"}
                dataSource={laptops}
                size={"middle"}
                columns={getColumns()}
                title={() => <LaptopsTableHeader onClick={() => setCreateModalOpen(true)}/>}
            />
            {createModalOpen && <CreateLaptopModal createModalOpen={createModalOpen} onClose={closeCreateModal} onReload={loadLaptops}/>}
        </>
    )
}