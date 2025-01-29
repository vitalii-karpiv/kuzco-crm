import PropTypes from "prop-types";
import {Card, Table, Typography} from "antd";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SaleService from "../../api/services/sale-service.js";
import SaleStateTag from "../common/sale-state-tag.jsx";
import LaptopService from "../../api/services/laptop-service.js";

export default function SalesTableByCustomer({sale}) {

    const navigate = useNavigate();
    const [salesList, setSalesList] = useState([]);

    useEffect(() => {
        if (sale?.customerId) {
            loadSales();
        }
    }, [sale]);

    async function loadSales() {
        const sales = await SaleService.list({customerId: sale?.customerId});
        const filteredSales = sales.itemList.filter(oldSales => oldSales._id !== sale._id)
        if (filteredSales?.length) {
            const laptops = await loadLaptops(filteredSales);
            const labeledSales = filteredSales.map(sale => {
                let laptop = laptops.find(laptop => laptop._id === sale.laptopId);
                sale.laptopName = laptop.name;
                return sale;
            });
            setSalesList(labeledSales);
        }
    }

    async function loadLaptops(sales) {
        const laptopsDtoOut = await LaptopService.list({idList: sales.map(sale => sale.laptopId)});
        return laptopsDtoOut?.itemList || [];
    }

    const getColumns = () => {
        return [
            {
                title: 'Laptop name',
                dataIndex: 'laptopName',
                key: 'laptopName',
            },
            {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
                render: state => <SaleStateTag state={state}/>
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            }
        ]
    }

    return (
        <Card bordered={false} hoverable={true} className={"w-full my-2"}>
            <div className={"flex justify-between"}>
                <Typography.Title level={4}>Other sales</Typography.Title>
            </div>
            {salesList &&
                <Table
                    onRow={(record) => {
                        return {
                            onClick: () => navigate(`/sales/saleDetail/${record._id}`)
                        }
                    }}
                    pagination={false}
                    className={"w-full"}
                    dataSource={salesList}
                    columns={getColumns()}
                    size={"small"}
                    showHeader={true}
                />}
        </Card>
    )
}

SalesTableByCustomer.propTypes = {
    sale: PropTypes.object.isRequired,
}