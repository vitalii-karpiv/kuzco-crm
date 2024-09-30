import {useEffect, useRef, useState} from "react";
import OrderService from "../api/services/order-service.js";
import {Table, Tag, Button, Input, Space} from "antd";
import Highlighter from 'react-highlight-words';
import {Link, useNavigate} from "react-router-dom";
import OrderManager from "../helpers/order-manager.js";
import { SearchOutlined } from '@ant-design/icons';

export default function Orders() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

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

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    const getColumns = () => {
        return [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                ...getColumnSearchProps('name'),
            },
            {
                title: 'DateOfPurchase',
                dataIndex: 'dateOfPurchase',
                key: 'dateOfPurchase',
                defaultSortOrder: 'descend',
                sorter: (a, b) => new Date(a.dateOfPurchase) > new Date(b.dateOfPurchase),
                sortDirections: ['descend'],
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

    // TODO: refactor this function
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    return (
        <Table
            className={"ml-3 w-full"}
            dataSource={orders}
            columns={getColumns()}
            size={"middle"}
            onRow={(record) => {
                return {
                    onClick: () => {
                        navigate(`orderDetail/${record._id}`)
                    },
                };
            }}
        />
    )
}