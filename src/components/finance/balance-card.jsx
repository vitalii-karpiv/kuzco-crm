import {useEffect, useState} from "react";
import {Button, Card, Spin, Typography} from "antd";
import FinanceService from "../../api/services/finance-service.js";
import * as FinanceManager from "../../helpers/finance-manager.js";

export default function BalanceCard() {
    const [balanceList, setBalanceList] = useState()
    const [isLoadingBalance, setIsLoadingBalance] = useState(true)

    useEffect(() => {
        loadBalances();
    }, []);

    async function loadBalances() {
        const balanceListDtoOut = await FinanceService.balanceList({});
        setBalanceList(balanceListDtoOut.itemList);
        setIsLoadingBalance(false)
    }

    async function syncBalances() {
        setIsLoadingBalance(true)
        await FinanceService.balanceSync({});
        await loadBalances()
        setIsLoadingBalance(false)
    }

    const balanceValue = balanceList?.reduce((acc, balance) => acc + balance.value, 0);

    function prettifyNumber(num) {
        if (num > 999) {
            return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        return num.toFixed(2);
    }

    return (
        <Card bordered={false} hoverable={true} className={"w-full"}>
            <div className={"flex justify-between w-full"}>
                <Typography.Title level={4}>Balance: {isLoadingBalance ?
                        <Spin/> : FinanceManager.prettifyNumber(balanceValue)} UAH</Typography.Title>
                <Button onClick={syncBalances}>Sync balance</Button>
            </div>
            <div className={"flex-col align-middle"}>
                <div className={"flex mb-2"}>
                    {balanceList?.map((balance) => (
                        <div key={balance._id}
                             className={"bg-indigo-100 p-2 rounded mr-2"}>{balance.title}: {prettifyNumber(balance.value)} uah</div>))

                    }
                </div>
                <div className={"flex"}>
                    <div className={"bg-pink-100 p-2 rounded mr-2"}>Earn: 0 uah</div>
                    <div className={"bg-fuchsia-100 p-2 rounded"}>Revenue: 0 uah</div>
                </div>
            </div>

        </Card>
    )
}

BalanceCard.propTypes = {}