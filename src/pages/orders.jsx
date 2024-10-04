import {useEffect, useRef, useState} from "react";
import OrderService from "../api/services/order-service.js";
import {Table, Tag, Button} from "antd";
import {useNavigate} from "react-router-dom";
import OrderManager from "../helpers/order-manager.js";
import TableHelper from "../utils/table-helper.jsx";
import OrdersTableHeader from "../components/order/orders-table-header.jsx";
import CreateOrderModal from "../components/order/create-order-modal.jsx";
import {SearchOutlined, DeleteOutlined} from "@ant-design/icons";
import Loading from "../components/loading.jsx";
import DateView from "../components/date.jsx";

export default function Orders() {
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
        async function loadOrders() {
            const ordersDto = await OrderService.list({});
            setOrders(ordersDto.itemList);
            setIsLoading(false);
        }
        loadOrders();
    }, []);

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
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                ...TableHelper.getColumnSearchProps('name', searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
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
                title: "State",
                dataIndex: "state",
                key: "state",
                render: (state) => <Tag
                    color={OrderManager.getOrderStateColor(state)}>{OrderManager.getOrderStateLabel(state)}</Tag>,
                filters: OrderManager.getFilterList(),
                onFilter: (value, record) => record.state === value
            },
            {
                title: "Ebay URL",
                dataIndex: "ebayUrl",
                key: "ebayUrl",
                render: (text) => <div>{text}</div>,
            },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: (record) => {
                    return <div className={"w-full flex justify-evenly"}>
                        <Button onClick={() => navigate(`orderDetail/${record._id}`)} shape="circle" icon={<SearchOutlined />} />
                        <Button onClick={() => console.log(`delete ${record._id}`)} shape="circle" icon={<DeleteOutlined />} />
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
                size={"middle"}
                showHeader={true}
                title={() => <OrdersTableHeader onClick={() => setCreateModalOpen(true)}/>}
            />
            {createModalOpen && <CreateOrderModal createModalOpen={createModalOpen} closeCreateModal={closeCreateModal} handleReload={handleReload}/>}
        </>
    )
}