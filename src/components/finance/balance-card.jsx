import { useEffect, useState } from "react";
import { Button, Card, Spin, Typography } from "antd";
import FinanceService from "../../api/services/finance-service.js";
import * as FinanceManager from "../../helpers/finance-manager.js";

export default function BalanceCard() {
  const [balanceList, setBalanceList] = useState();
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);

  useEffect(() => {
    loadBalances();
  }, []);

  async function loadBalances() {
    const balanceListDtoOut = await FinanceService.balanceList({});
    setBalanceList(balanceListDtoOut.itemList);
    setIsLoadingBalance(false);
  }

  async function syncBalances() {
    setIsLoadingBalance(true);
    await FinanceService.balanceSync({});
    await loadBalances();
    setIsLoadingBalance(false);
  }

  const balanceValue = balanceList?.reduce((acc, balance) => acc + balance.value, 0);

  return (
    <Card bordered={false} hoverable={true} className={"w-full"}>
      <div className={"flex justify-between w-full"}>
        <Typography.Title level={4}>
          Balance: {isLoadingBalance ? <Spin /> : FinanceManager.prettifyNumber(balanceValue)} UAH
        </Typography.Title>
        <Button onClick={syncBalances}>Sync balance</Button>
      </div>
      <div className={"flex-col align-middle"}>
        <div className={"flex mb-2"}>
          {balanceList?.map((balance) => (
            <div key={balance._id} className={"bg-indigo-100 p-2 rounded mr-2"}>
              {balance.title}: {isLoadingBalance ? <Spin /> : FinanceManager.prettifyNumber(balance.value)} UAH
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

BalanceCard.propTypes = {};
