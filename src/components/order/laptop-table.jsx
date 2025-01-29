import PropTypes from "prop-types";
import {Card, Table, Typography} from "antd";
import {useEffect, useState} from "react";
import LaptopService from "../../api/services/laptop-service.js";
import LaptopStateTag from "../common/laptop-state-tag.jsx";
import {useNavigate} from "react-router-dom";

export default function LaptopTable({order = {}}) {

    const navigate = useNavigate();
    const [laptopList, setLaptopList] = useState();

    useEffect(() => {
        async function loadLaptops(order) {
            const laptops = await LaptopService.list({orderId: order._id});
            setLaptopList(laptops.itemList);
        }

        if (order) {
            loadLaptops(order);
        }
    }, [order]);

    const getLaptopColumns = () => {
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
        ]
    }

    return (
        <Card bordered={false} hoverable={true} className={"w-full my-3"}>
            <div className={"flex justify-between"}>
                <Typography.Title level={4}>Laptops</Typography.Title>
            </div>
            {laptopList &&
                <Table
                    onRow={(record) => {
                        return {
                            onClick: () => navigate(`/laptops/laptopDetail/${record._id}`)
                        }
                    }}
                    pagination={false}
                    className={"w-full"}
                    dataSource={laptopList}
                    columns={getLaptopColumns()}
                    size={"small"}
                    showHeader={true}
                />}
        </Card>
    )
}

LaptopTable.propTypes = {
    order: PropTypes.object.isRequired,
}