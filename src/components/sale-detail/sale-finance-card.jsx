import { Card, Typography } from "antd";
import PropTypes from "prop-types";
import FinanceService from "../../api/services/finance-service.js";
import { useEffect, useState } from "react";
import LaptopService from "../../api/services/laptop-service.js";
import ExpenseAmountView from "../expense-amount-view.jsx";
import { prettifyNumber } from "../../helpers/finance-manager.js";

export default function SaleFinanceCard({ sale }) {
  const [laptopCostPrice, setLaptopCostPrice] = useState();
  const [profitability, setProfitability] = useState("-");

  useEffect(() => {
    loadLaptopCostPrice();
  }, [sale._id, sale.price]);

  async function loadLaptopCostPrice() {
    const laptop = await LaptopService.get(sale.laptopId);
    const costPrice = await FinanceService.getCostPricePerLaptop(laptop.orderId);
    if (costPrice && sale.price) {
      let costPricePrepared = (costPrice * -1) / 100;
      let profit = sale.price - costPricePrepared;
      let profitability = (profit / costPricePrepared) * 100;
      setProfitability(parseFloat(profitability.toFixed(2)));
    }
    setLaptopCostPrice(costPrice);
  }

  return (
    <Card bordered={false} hoverable={true} className={"mb-2 h-1/2"}>
      <div className={"mb-2"}>
        Price:{" "}
        <Typography.Text code strong>
          {prettifyNumber(sale.price)} грн
        </Typography.Text>
      </div>
      <div className={"mb-2"}>
        Собівартість: <ExpenseAmountView amount={laptopCostPrice} />
      </div>
      <div className={"mb-2"}>
        Рентабельність:{" "}
        <Typography.Text code strong type={profitability < 10 ? "danger" : profitability > 30 ? "success" : "warning"}>
          {profitability}%
        </Typography.Text>
      </div>
    </Card>
  );
}

SaleFinanceCard.propTypes = {
  sale: PropTypes.object.isRequired,
};
