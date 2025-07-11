import { useEffect, useState } from "react";
import Loading from "../components/loading.jsx";
import SaleService from "../api/services/sale-service.js";
import { useParams } from "react-router-dom";
import { Alert, Button, Typography, Select, message, Spin } from "antd";
import LaptopService from "../api/services/laptop-service.js";
import CustomerDetailCard from "../components/sale-detail/customer-detail-card.jsx";
import SaleDetailCard from "../components/sale-detail/sale-detail-card.jsx";
import SaleFinanceCard from "../components/sale-detail/sale-finance-card.jsx";
import SalesTableByCustomer from "../components/sale-detail/sales-table-by-customer.jsx";
import LaptopDetail from "../components/sale-detail/laptop-detail.jsx";
import { useUserContext } from "../components/user-context.jsx";

export default function SaleDetail() {
  let { id } = useParams();

  const [sale, setSale] = useState();
  const [laptop, setLaptop] = useState();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [assigneeLoading, setAssigneeLoading] = useState(false);

  useEffect(() => {
    loadSale();
  }, [id]);

  useEffect(() => {
    if (sale) {
      loadLaptop();
    }
  }, [sale]);

  async function loadSale() {
    const salesDtoOut = await SaleService.get(id);
    document.title = `${salesDtoOut.code}`;
    setSale(salesDtoOut);
  }

  async function loadLaptop() {
    const laptopDtoOut = await LaptopService.get(sale.laptopId);
    setLaptop(laptopDtoOut);
  }

  async function setSaleState(state) {
    try {
      const updated = await SaleService.setState({ id: sale._id, state });
      setSale(updated);
    } catch (e) {
      setShowErrorAlert(true);
    }
  }

  const { users: userList } = useUserContext();

  async function handleSetAssignee(userId) {
    try {
      setAssigneeLoading(true);
      const updated = await SaleService.updateAssignee(sale._id, userId);
      setSale(updated);
    } catch (e) {
      console.error(e);
      message.error("Failed to update assignee!");
    } finally {
      setAssigneeLoading(false);
    }
  }

  if (!sale) {
    return <Loading />;
  }

  return (
    <div className={"block w-full mx-5"}>
      <header className={"flex justify-between align-middle items-center"}>
        <Typography.Title level={3} className={"mr-4"}>
          <Typography.Text code>{sale.code}</Typography.Text> {laptop?.name}
        </Typography.Title>
        <div className={"flex items-center"}>
          {userList && (
            <div className={"flex items-center mr-4"}>
              <span className={"text-xs text-gray-700 mr-1"}>Assignee:</span>
              <Select
                defaultValue={sale.assignee}
                value={sale.assignee}
                placement={"bottomRight"}
                suffixIcon={assigneeLoading ? <Spin size="small" /> : null}
                popupClassName={"min-w-44"}
                onChange={handleSetAssignee}
                variant="filled"
                className={"ml-0"}
                disabled={assigneeLoading}
              >
                {userList.map((user) => (
                  <Select.Option key={user._id} value={user._id}>
                    {user.name} {user.surname}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}
          {sale.state === "new" && (
            <Button className={"bg-amber-200 mr-3"} onClick={() => setSaleState("delivering")}>
              Set delivering
            </Button>
          )}
          {sale.state === "delivering" && (
            <div className={"flex justify-between align-middle"}>
              <Button className={"bg-green-500 mr-3"} onClick={() => setSaleState("done")}>
                Set done
              </Button>
              <Button className={"bg-red-500 mr-3"} onClick={() => setSaleState("rejected")}>
                Set rejected
              </Button>
            </div>
          )}
        </div>
      </header>
      <div className={"flex mb-3"}>
        <SaleDetailCard sale={sale} setSale={setSale} />
        <div className={"flex flex-col w-2/4"}>
          <SaleFinanceCard sale={sale} />
          <CustomerDetailCard sale={sale} />
        </div>
      </div>
      <LaptopDetail sale={sale} />
      <SalesTableByCustomer sale={sale} />

      {showErrorAlert && (
        <>
          {" "}
          <Alert
            message="Failed to update sale!"
            type="error"
            showIcon
            closable
            onClose={() => setShowErrorAlert(false)}
          />{" "}
          <br />{" "}
        </>
      )}
    </div>
  );
}
