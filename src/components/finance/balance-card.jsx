import {useEffect, useState} from "react";
import {Button, Card, Typography} from "antd";
import FinanceService from "../../api/services/finance-service.js";

export default function BalanceCard() {
    const [balanceList, setBalanceList] = useState()

    useEffect(() => {
        loadBalances();
    }, []);

    async function loadBalances() {
        const balanceListDtoOut = await FinanceService.balanceList({});
        setBalanceList(balanceListDtoOut.itemList);
    }

    async function syncBalances() {
        await FinanceService.balanceSync({});
        await loadBalances()
    }

    const balanceValue = balanceList?.reduce((acc, balance) => acc + balance.value, 0);

    return (
        <Card bordered={false} hoverable={true} className={"w-full"}>
            <div className={"flex justify-between w-full"}>
                <Typography.Title level={4}>Balance</Typography.Title>
                <Button onClick={syncBalances}>Sync balance</Button>
            </div>
            <div className={"flex align-middle"}>
                <div className={"bg-neutral-200 p-2 rounded mr-2"}>Balance: {balanceValue} uah</div>
                <div className={"bg-neutral-200 p-2 rounded mr-2"}>Earn: 0 uah</div>
                <div className={"bg-neutral-200 p-2 rounded"}>Revenue: 0 uah</div>
            </div>

        </Card>
    )
}

BalanceCard.propTypes = {}