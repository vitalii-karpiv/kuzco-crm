import {Card, Typography, message} from "antd";
import {Link} from "react-router-dom";
import {useUserContext} from "../user-context.jsx";
import {useEffect, useState} from "react";
import SaleService from "../../api/services/sale-service.js";
import LaptopService from "../../api/services/laptop-service.js";
import SaleStateTag from "../common/sale-state-tag.jsx";

export default function AssignedSaleList() {
    const { me } = useUserContext();
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadSales();
    }, []);

    async function loadSales() {
        setIsLoading(true);
        try {
            const salesDtoOut = await SaleService.list({ assignee: me?._id });
            let salesWithNames = salesDtoOut.itemList;
            // If laptopName is missing, fetch it
            await Promise.all(salesWithNames.map(async (sale, idx) => {
                if (!sale.laptopName && sale.laptopId) {
                    try {
                        const laptop = await LaptopService.get(sale.laptopId);
                        salesWithNames[idx].laptopName = laptop.name;
                    } catch (err) {
                        console.error(err);
                        message.error("Failed to fetch laptop name for a sale.");
                    }
                }
            }));
            setSales([...salesWithNames]);
        } catch (err) {
            console.error(err);
            message.error("Failed to fetch assigned sales.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className={"w-2/4 ml-2 mt-1"} loading={isLoading}>
            <Typography.Title level={4}>Assigned Sales</Typography.Title>
            <ul className={"list-disc list-inside space-y-2 overflow-y-auto max-h-[310px]"}>
                {sales.map((sale) => (
                    <li key={sale.code}>
                        <Link to={`/sales/saleDetail/${sale._id}`} className={"bg-green-50 rounded p-1"}>
                            <Typography.Text code>{sale.code}</Typography.Text> {sale.laptopName || ''} <SaleStateTag state={sale.state} />
                        </Link>
                    </li>
                ))}
            </ul>
        </Card>
    );
} 