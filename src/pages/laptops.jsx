import {useEffect, useState} from "react";
import {Button, Table} from "antd";
import LaptopService from "../api/services/laptop-service.js";
import Loading from "../components/loading.jsx";
import {DeleteOutlined, SearchOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import LaptopsTableHeader from "../components/laptops-table-header.jsx";
import CreateLaptopModal from "../components/create-laptop-modal.jsx";

export default function Laptops() {
    const [laptops, setLaptops] = useState();
    const navigate = useNavigate();

    const [createModalOpen, setCreateModalOpen] = useState(false);

    useEffect(() => {
        async function loadLaptops() {
            const ordersDto = await LaptopService.list({});
            setLaptops(ordersDto.itemList);
        }

        loadLaptops();
    }, []);

    const closeCreateModal = () => {
        setCreateModalOpen(false);
    }

    const getColumns = () => {
        return [
            {
                title: 'Brand',
                dataIndex: 'brand',
                key: 'brand',
            },
            {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
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
                columns={getColumns()}
                title={() => <LaptopsTableHeader onClick={() => setCreateModalOpen(true)}/>}
            />
            {createModalOpen && <CreateLaptopModal createModalOpen={createModalOpen} onClose={closeCreateModal}/>}
        </>
    )
}