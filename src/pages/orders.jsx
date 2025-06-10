import {useEffect, useRef, useState} from "react";
import OrderService from "../api/services/order-service.js";
import {Table, Button, message, Popconfirm} from "antd";
import {useNavigate} from "react-router-dom";
import OrderManager from "../helpers/order-manager.js";
import TableHelper from "../utils/table-helper.jsx";
import OrdersTableHeader from "../components/order/orders-table-header.jsx";
import CreateOrderModal from "../components/order/create-order-modal.jsx";
import {SearchOutlined, DeleteOutlined} from "@ant-design/icons";
import Loading from "../components/loading.jsx";
import DateView from "../components/date-view.jsx";
import OrderStateTag from "../components/common/order-state-tag.jsx";

export default function Orders() {
    document.title = "Orders";
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const [createModalOpen, setCreateModalOpen] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {
        const ordersDto = await OrderService.list({});
        setOrders(ordersDto.itemList);
        setIsLoading(false);
    }

    const handleDelete = async (id) => {
        try {
            await OrderService.delete(id);
            message.success('Order deleted!');
            await loadOrders()
        }
        catch (error) {
            message.error('Failed to delete order!')
        }
    }

    const handleReload = async () => {
        const ordersDto = await OrderService.list({});
        setOrders(ordersDto.itemList);
        setIsLoading(false);
    }

    if (isLoading) {
        return <Loading />
    }

    const closeCreateModal = () => {
        setCreateModalOpen(false);
    }

    const getColumns = () => {
        return [
            {
                title: 'Code',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                ...TableHelper.getColumnSearchProps('name', searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
            },
            {
                title: "State",
                dataIndex: "state",
                key: "state",
                render: (state) => <OrderStateTag state={state}/>,
                filters: OrderManager.getFilterList(),
                onFilter: (value, record) => record.state === value
            },
            {
                title: 'DateOfPurchase',
                dataIndex: 'dateOfPurchase',
                key: 'dateOfPurchase',
                defaultSortOrder: 'descend',
                sorter: (a, b) => new Date(a.dateOfPurchase) > new Date(b.dateOfPurchase),
                sortDirections: ['descend'],
                render: (date) => <DateView dateStr={date}/>,
            },
            {
                title: 'ItemsInLot',
                dataIndex: 'itemsInLot',
                key: 'itemsInLot',
            },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: (record) => {
                    return <div className={"w-full flex justify-evenly"}>
                        <Button onClick={() => navigate(`orderDetail/${record._id}`)} shape="circle" icon={<SearchOutlined />} />
                        <Popconfirm
                            title={'Are you sure you want to delete this order?'}
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

    return (
        <>
            <Table
                className={"ml-3 w-full"}
                dataSource={orders}
                columns={getColumns()}
                size={"small"}
                showHeader={true}
                title={() => <OrdersTableHeader onClick={() => setCreateModalOpen(true)}/>}
            />
            {createModalOpen && <CreateOrderModal createModalOpen={createModalOpen} closeCreateModal={closeCreateModal} handleReload={handleReload}/>}
        </>
    )
}