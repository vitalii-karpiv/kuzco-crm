import {useEffect, useState} from "react";
import {Card, Typography} from "antd";

export default function BalanceCard() {
    const [balance, setBalance] = useState()

    useEffect(() => {
        // TODO: load balance
    }, []);

    return (
        <Card bordered={false} hoverable={true} className={"w-full"}>
            <Typography.Title level={4}>Balance</Typography.Title>
            <div className={"flex justify-between align-middle w-2/4"}>
                <div className={"bg-neutral-200 p-2 rounded"}>Balance: 0 uah</div>
                <div className={"bg-neutral-200 p-2 rounded"}>Earn: 0 uah</div>
                <div className={"bg-neutral-200 p-2 rounded"}>Revenue: 0 uah</div>
            </div>

        </Card>
    )
}

BalanceCard.propTypes = {}