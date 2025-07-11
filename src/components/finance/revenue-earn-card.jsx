import { Card, DatePicker, Typography, message } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import FinanceService from "../../api/services/finance-service.js";
import { prettifyNumber } from "../../helpers/finance-manager.js";

const { RangePicker } = DatePicker;

export default function RevenueEarnCard() {
  const [range, setRange] = useState([dayjs().startOf("month"), dayjs().endOf("month")]);
  const [revenue, setRevenue] = useState(null);
  const [earn, setEarn] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line
  }, [range]);

  async function fetchStats() {
    setLoading(true);
    try {
      const res = await FinanceService.getRevenueAndEarnings({
        from: range[0].startOf("day").toISOString(),
        to: range[1].endOf("day").toISOString(),
      });
      setRevenue(res.revenue);
      setEarn(res.earn);
    } catch (e) {
      message.error("Failed to fetch revenue/earnings");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className={"mb-2"} loading={loading} bordered={false} hoverable={true}>
      <div>
        <div className={"flex"}>
          <Typography.Title level={4} className={"mb-0"}>
            Revenue & Earnings
          </Typography.Title>
          <RangePicker
            value={range}
            onChange={(dates) => dates && setRange(dates)}
            allowClear={false}
            className={"ml-4"}
          />
        </div>
        <div className={"mt-2"}>
          <div className={"flex"}>
            <div className={"bg-pink-100 p-2 rounded mr-2"}>
              Revenue: {revenue !== null ? prettifyNumber(revenue) : "-"} UAH
            </div>
            <div className={"bg-fuchsia-100 p-2 rounded"}>
              Earn (net): {earn !== null ? prettifyNumber(earn) : "-"} UAH
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
