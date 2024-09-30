import {useEffect, useRef, useState} from "react";
import OrderService from "../api/services/order-service.js";
import {Table, Tag} from "antd";
import {Link, useNavigate} from "react-router-dom";
import OrderManager from "../helpers/order-manager.js";
import TableHelper from "../utils/table-helper.jsx";
import OrdersTableHeader from "../components/orders-table-header.jsx";
import CreateOrderModal from "../components/create-order-modal.jsx";

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
        return <h1>Loading...</h1>
    }

    const closeCreateModal = () => {
        setCreateModalOpen(false);
        handleReload();
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
                render: (date) => <span>{new Date(date).getFullYear()}-{new Date(date).getMonth()+1}-{new Date(date).getDate()}</span>,
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
                render: (text) => <Link to={text}>{text}</Link>,
            }
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
                onRow={(record) => {
                    return {
                        onClick: () => {
                            navigate(`orderDetail/${record._id}`)
                        },
                    };
                }}
            />
            {createModalOpen && <CreateOrderModal createModalOpen={createModalOpen} closeCreateModal={closeCreateModal}/>}
        </>
    )
}