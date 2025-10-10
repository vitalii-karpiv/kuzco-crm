import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/loading.jsx";
import LaptopService from "../api/services/laptop-service.js";
import { Button, Select, Typography, Spin, message } from "antd";
import UpdateCharacteristicsModal from "../components/laptop-detail/update-characteristics-modal.jsx";
import BuyStockModal from "../components/laptop-detail/buy-stock-modal.jsx";
import StockService from "../api/services/stock-service.js";
import LaptopManager from "../helpers/laptop-manager.js";
import CharacteristicsBlock from "../components/laptop-detail/characteristics-block.jsx";
import ToBuyBlock from "../components/laptop-detail/to-buy-block.jsx";
import ComplectationBlock from "../components/laptop-detail/complectation-block.jsx";
import FinanceBlock from "../components/laptop-detail/finance-block.jsx";
import MarketplaceBlock from "../components/laptop-detail/marketplace-block.jsx";
import DefectsBlock from "../components/laptop-detail/defects-block.jsx";
import TechCheckBlock from "../components/laptop-detail/tech-check-block.jsx";
import LaptopStateTag from "../components/common/laptop-state-tag.jsx";
import SaleCreateModal from "../components/laptop-detail/sale-create-modal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareUpRight } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../components/user-context.jsx";

export default function LaptopDetail() {
  let { id } = useParams();
  const [laptop, setLaptop] = useState();
  const [stockList, setStockList] = useState();
  const [showUpdateCharacteristics, setShowUpdateCharacteristics] = useState(false);
  const [stockOpt, setStockOpt] = useState({ show: false, index: null });
  const { users: userList } = useUserContext();

  const [saleCreateOpen, setSaleCreateOpen] = useState(false);
  const [assigneeLoading, setAssigneeLoading] = useState(false);

  useEffect(() => {
    loadLaptop();
    loadStock();
  }, [id]);

  const loadLaptop = async () => {
    const laptop = await LaptopService.get(id);
    document.title = `${laptop.code}`;
    setLaptop(laptop);
  };

  const handleSetState = async (state) => {
    const updated = await LaptopService.setState({ id, state });
    setLaptop(updated);
  };

  const handleSetAssignee = async (userId) => {
    try {
      setAssigneeLoading(true);
      const updated = await LaptopService.update({ id, assignee: userId });
      setLaptop(updated);
    } catch (e) {
      message.error("Failed to update assignee!");
      console.error(e);
    } finally {
      setAssigneeLoading(false);
    }
  };

  const loadStock = async () => {
    const stockListDto = await StockService.list({ laptopId: id });
    setStockList(stockListDto.itemList);
  };

  const onBuyStockReload = async () => {
    await loadStock();
    await loadLaptop();
  };

  if (!laptop) {
    return <Loading />;
  }

  return (
    <div className={"block w-full mx-5"}>
      <header className={"flex justify-between items-center"}>
        <Typography.Title level={3}>
          <Typography.Title level={4} className={"inline"}>
            #{laptop.code}
          </Typography.Title>{" "}
          {laptop.name}
        </Typography.Title>
        <div className={"flex justify-between items-center"}>
          <Link target={"_blank"} to={`/orders/orderDetail/${laptop.orderId}`} className={"mr-2"}>
            <FontAwesomeIcon icon={faSquareUpRight} /> Order
          </Link>
          {userList && (
            <div className={"flex items-center mr-4"}>
              <span className={"text-xs text-gray-700 mr-1"}>Assignee:</span>
              <Select
                defaultValue={laptop.assignee}
                value={laptop.assignee}
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
          <Select
            defaultValue={laptop.state}
            variant={"borderless"}
            placement={"bottomRight"}
            suffixIcon={null}
            popupClassName={"min-w-44"}
            onChange={(state) => handleSetState(state)}
          >
            {LaptopManager.getLaptopStateList().map((state) => (
              <Select.Option key={state} value={state}>
                <LaptopStateTag state={state} />
              </Select.Option>
            ))}
          </Select>
          <Button
            onClick={() => setSaleCreateOpen(true)}
            className={"bg-green-100"}
            size={"small"}
            disabled={LaptopManager.getFinalStates().includes(laptop.state)}
          >
            Продано!
          </Button>
        </div>
      </header>
      <div className={"flex mb-1 items-start"}>
        <CharacteristicsBlock laptop={laptop} setLaptop={setLaptop} />
        <div className={"w-2/4 flex-col"}>
          <TechCheckBlock laptop={laptop} setLaptop={setLaptop} />
          <DefectsBlock laptop={laptop} setLaptop={setLaptop} />
        </div>
      </div>
      <div className={"flex mb-3"}>
        <ComplectationBlock stockList={stockList} setStockList={setStockList} laptopId={laptop?._id} />
        <ToBuyBlock laptop={laptop} setStockOpt={setStockOpt} setLaptop={setLaptop} />
      </div>
      <div className={"flex mb-3"}>
        <FinanceBlock laptop={laptop} setLaptop={setLaptop} />
        <MarketplaceBlock laptop={laptop} setLaptop={setLaptop} />
      </div>
      {/*  MODALS  */}
      {showUpdateCharacteristics && (
        <UpdateCharacteristicsModal
          open={showUpdateCharacteristics}
          onClose={() => setShowUpdateCharacteristics(false)}
          onReload={loadLaptop}
          id={id}
        />
      )}
      {stockOpt.show && (
        <BuyStockModal
          open={stockOpt.show}
          onClose={() => setStockOpt({ show: false, index: null })}
          onReload={onBuyStockReload}
          id={id}
          index={stockOpt.index}
          toBuyArray={laptop.toBuy}
        />
      )}

      {saleCreateOpen && (
        <SaleCreateModal laptop={laptop} modalOpen={saleCreateOpen} closeModal={() => setSaleCreateOpen(false)} />
      )}
    </div>
  );
}
