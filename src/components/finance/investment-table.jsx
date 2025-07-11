import { Button, message, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import DateView from "../date-view.jsx";
import InvestmentService from "../../api/services/investment-service.js";
import { useUserContext } from "../user-context.jsx";
import InvestmentCreateModal from "./investment-create-modal.jsx";
import PropTypes from "prop-types";
import * as FinanceManager from "../../helpers/finance-manager.js";
import PriceAmountView from "../price-amount-view.jsx";

export default function InvestmentTable() {
  const [investments, setInvestments] = useState();
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { users } = useUserContext();

  useEffect(() => {
    loadInvestments();
  }, []);

  async function loadInvestments() {
    setIsLoading(true);
    try {
      const investmentsDtoOut = await InvestmentService.list({});
      setInvestments(investmentsDtoOut.itemList);
      setFilteredInvestments(investmentsDtoOut.itemList);
    } catch (e) {
      message.error("Load investments failed!");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const handleTableChange = (pagination, filters, sorter, extra) => {
    if (extra.currentDataSource) {
      setFilteredInvestments(extra.currentDataSource);
    }
  };

  function handleCloseCreateModal() {
    setOpenCreateModal(false);
    loadInvestments();
  }

  const columns = [
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => {
        if (!users) return <p>Loading...</p>;
        const user = users.find((user) => user._id === userId);
        return (
          <p>
            {user.name} {user.surname}
          </p>
        );
      },
      filters: users.map((user) => {
        return {
          value: user._id,
          text: `${user.name} ${user.surname}`,
        };
      }),
      onFilter: (value, record) => record.userId === value,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <PriceAmountView amount={amount} />,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <DateView dateStr={date} showTime />,
    },
  ];

  if (!investments) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table
        className={"w-full"}
        dataSource={investments}
        columns={columns}
        size={"small"}
        loading={isLoading}
        virtual
        pagination={false}
        onChange={handleTableChange}
        footer={() => <InvestmentTableFooter investments={filteredInvestments} />}
        key={"_id"}
        title={() => <InvestmentTableHeader onCreate={() => setOpenCreateModal(true)} />}
      />
      {openCreateModal && <InvestmentCreateModal open={openCreateModal} closeCreateModal={handleCloseCreateModal} />}
    </>
  );
}

function InvestmentTableHeader({ onCreate }) {
  return (
    <div className={"flex justify-between items-center"}>
      <Typography.Title level={4}>Investments</Typography.Title>
      <Button className={"bg-sky-400 text-white"} onClick={onCreate}>
        Create investment
      </Button>
    </div>
  );
}

function InvestmentTableFooter({ investments }) {
  const totalAmount = investments.reduce((sum, investment) => sum + investment.amount, 0);
  return (
    <div>
      Total: {investments.length} investments, amount:{" "}
      <span className={"font-bold"}>{FinanceManager.prettifyNumber(totalAmount)}</span> UAH
    </div>
  );
}

InvestmentTable.propTypes = {};
InvestmentTableHeader.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
InvestmentTableFooter.propTypes = {
  investments: PropTypes.array.isRequired,
};
