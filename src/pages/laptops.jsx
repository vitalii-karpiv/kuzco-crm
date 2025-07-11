import {useEffect, useState} from "react";
import {Button, message, Popconfirm, Table, Select} from "antd";
import LaptopService from "../api/services/laptop-service.js";
import Loading from "../components/loading.jsx";
import {DeleteOutlined, SearchOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import LaptopsTableHeader from "../components/laptop/laptops-table-header.jsx";
import CreateLaptopModal from "../components/laptop/create-laptop-modal.jsx";
import SorterBar from "../components/laptop-detail/sorter-bar.jsx";
import FilterBar from "../components/laptop-detail/filter-bar.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import LaptopManager from "../helpers/laptop-manager.js";
import LaptopStateTag from "../components/common/laptop-state-tag.jsx";

export default function Laptops() {
    document.title = "Laptops"
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

     const handleDelete = async (id) => {
      try {
        await LaptopService.delete(id);
        message.success("Laptop deleted!");
        await loadLaptops();
      }
      catch (error) {
          message.error('Failed to delete laptop!');
      }
     }

    const handleSetState = async (laptopId, newState) => {
        const updatedLaptop = await LaptopService.setState({ id: laptopId, state: newState });

        setLaptops(prev => prev.map(laptop => laptop._id === updatedLaptop._id ? updatedLaptop : laptop));
    };

    function handleCopy(laptop) {
        navigator.clipboard.writeText(laptopCharacteristics(laptop))
            .then(() => {
                message.success("Characteristics copied!");
            })
            .catch(() => {
                message.error("Failed to copy.");
            });
    }

     function laptopCharacteristics(laptop) {
         const name = laptop.name;
         const processor = laptop.characteristics?.processor;
         const videocard = laptop.characteristics?.videocard;
         const ssd = laptop.characteristics?.ssd;
         const ram = laptop.characteristics?.ram;
         const screenSize = laptop.characteristics?.screenSize;
         const resolution = laptop.characteristics?.resolution;
         const panelType = laptop.characteristics?.panelType;

         return `${name} | ${processor || "not specified"} | ${videocard ? `${videocard} GB` : "not specified"} | ${ssd ? `${ssd} GB` : "not specified"} | ${ram ? `${ram} GB` : "not specified"} | ${screenSize ? `${screenSize}"` : "not specified"} ${resolution || "not specified"} ${panelType || "not specified"}`;
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
                render: (state, record) =>  (
                    <Select
                        defaultValue={state}
                        variant={"borderless"}
                        placement={"bottomRight"}
                        suffixIcon={null}
                        popupClassName={"min-w-44"}
                        onChange={(newState) => handleSetState(record._id, newState)}
                    >
                        {LaptopManager.getLaptopStateList().map(state => <Select.Option key={state} value={state}><LaptopStateTag
                            state={state}/></Select.Option>)}
                    </Select>
                )
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
                        <Popconfirm
                            title={'Are you sure you want to delete this laptop?'}
                            onConfirm={() => handleDelete(record._id)}
                            okText={'Yes'}
                            cancelText="No">
                        <Button shape="circle" icon={<DeleteOutlined />} className={'hover:!text-red-600  hover:!border-red-700'} />
                        </Popconfirm>
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
                className={"ml-3"}
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
                            {` ${laptopCharacteristics(laptop)}`}
                            <Button className={"ml-2 text-gray-500"} size={"small"} shape={"circle"} onClick={() => {handleCopy(laptop)}}>
                                <FontAwesomeIcon icon={faCopy}/>
                            </Button>
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