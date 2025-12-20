import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/loading.jsx";
import LaptopService from "../api/services/laptop-service.js";
import SaleService from "../api/services/sale-service.js";
import LaptopGroupService from "../api/services/laptop-group-service.js";
import { Button, Popconfirm, Select, Spin, Typography, message } from "antd";
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
import ImageManager from "../components/common/image-manager.jsx";
import LaptopStateTag from "../components/common/laptop-state-tag.jsx";
import SaleCreateModal from "../components/laptop-detail/sale-create-modal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareUpRight } from "@fortawesome/free-solid-svg-icons";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useUserContext } from "../components/user-context.jsx";

export default function LaptopDetail() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [laptop, setLaptop] = useState();
  const [stockList, setStockList] = useState();
  const [showUpdateCharacteristics, setShowUpdateCharacteristics] = useState(false);
  const [stockOpt, setStockOpt] = useState({ show: false, index: null });
  const { users: userList } = useUserContext();

  const [saleCreateOpen, setSaleCreateOpen] = useState(false);
  const [assigneeLoading, setAssigneeLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);
  const [relatedSale, setRelatedSale] = useState(null);
  const [groupLoading, setGroupLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadLaptop();
    loadStock();
    loadRelatedSale();
  }, [id]);

  const loadLaptop = async () => {
    const laptop = await LaptopService.get(id);
    document.title = `${laptop.code}`;
    setLaptop(laptop);
  };

  const handleSetState = async (state) => {
    try {
      setStateLoading(true);
      const updated = await LaptopService.setState({ id, state });
      setLaptop(updated);
      message.success(`State updated to ${LaptopManager.getLaptopStateLabel(state)}`);
    } catch (e) {
      console.error(e);
      message.error("Failed to update state!");
    } finally {
      setStateLoading(false);
    }
  };

  const handleSetAssignee = async (userId) => {
    try {
      setAssigneeLoading(true);
      const updated = await LaptopService.update({ id, assignee: userId });
      setLaptop(updated);
      message.success(`Assignee updated!`);
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

  const loadRelatedSale = async () => {
    try {
      const salesDto = await SaleService.list({ laptopIdList: [id] });
      if (salesDto.itemList && salesDto.itemList.length > 0) {
        setRelatedSale(salesDto.itemList[0]); // Get the first (most recent) sale
      }
    } catch (e) {
      message.error("Failed to load related sale");
    }
  };

  const onBuyStockReload = async () => {
    await loadStock();
    await loadLaptop();
  };

  const handleAddToGroup = async () => {
    try {
      setGroupLoading(true);
      await LaptopGroupService.addLaptop({ laptopId: id });
      message.success("Laptop added to group!");
      await loadLaptop();
    } catch (error) {
      console.error("Failed to add laptop to group:", error);
      const errorMessage = error?.response?.data?.message ?? "Failed to add laptop to group!";
      message.error(errorMessage);
    } finally {
      setGroupLoading(false);
    }
  };

  const handleRemoveFromGroup = async () => {
    if (!laptop?.laptopGroupId) {
      return;
    }
    try {
      setGroupLoading(true);
      await LaptopGroupService.removeLaptop({ laptopId: id, groupId: laptop.laptopGroupId });
      message.success("Laptop removed from group!");
      await loadLaptop();
    } catch (error) {
      console.error("Failed to remove laptop from group:", error);
      const errorMessage = error?.response?.data?.message ?? "Failed to remove laptop from group!";
      message.error(errorMessage);
    } finally {
      setGroupLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!laptop?._id) {
      return;
    }
    try {
      setIsDeleting(true);
      await LaptopService.delete(laptop._id);
      message.success("Laptop deleted successfully!");
      navigate("/laptops");
    } catch (e) {
      message.error("Laptop delete failed. Please try again.");
      console.log(e);
    } finally {
      setIsDeleting(false);
    }
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
          <div className={"flex items-center gap-3 mr-3"}>
            <Link
              target={"_blank"}
              to={`/orders/orderDetail/${laptop.orderId}`}
              className={"flex items-center gap-1 text-blue-700 hover:text-blue-900 transition-colors"}
            >
              <FontAwesomeIcon icon={faSquareUpRight} />
              Order
            </Link>
            {relatedSale && (
              <Link
                target={"_blank"}
                to={`/sales/saleDetail/${relatedSale._id}`}
                className={"flex items-center gap-1 text-green-700 hover:text-green-900 transition-colors"}
              >
                <FontAwesomeIcon icon={faSquareUpRight} />
                Sale
              </Link>
            )}
            <div className={"flex items-center gap-2"}>
              {laptop.laptopGroupId && (
                <Link
                  target={"_blank"}
                  to={`/laptopGroups/groupDetail/${laptop.laptopGroupId}`}
                  className={"flex items-center gap-1 text-purple-700 hover:text-purple-900 transition-colors"}
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faSquareUpRight} />
                  Group
                </Link>
              )}
              {laptop.laptopGroupId ? (
                <Popconfirm
                  title={"Remove laptop from the current group?"}
                  onConfirm={handleRemoveFromGroup}
                  okText={"Yes"}
                  cancelText="No"
                >
                  <Button
                    icon={<MinusOutlined />}
                    loading={groupLoading}
                    title="Remove from group"
                    size={"small"}
                    type="default"
                    className={
                      "flex items-center gap-1 text-xs rounded-full px-2 py-0.5 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                    }
                  >
                    Group
                  </Button>
                </Popconfirm>
              ) : (
                <Button
                  icon={<PlusOutlined />}
                  onClick={handleAddToGroup}
                  loading={groupLoading}
                  title="Add to group"
                  size={"small"}
                  type="default"
                  className={
                    "flex items-center gap-1 text-xs rounded-full px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100"
                  }
                >
                  Group
                </Button>
              )}
            </div>
          </div>
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
          <div className={"flex items-center mr-4"}>
            <span className={"text-xs text-gray-700 mr-1"}>State:</span>
            <Select
              defaultValue={laptop.state}
              value={laptop.state}
              variant={"filled"}
              placement={"bottomRight"}
              suffixIcon={stateLoading ? <Spin size="small" /> : null}
              popupClassName={"min-w-48"}
              onChange={handleSetState}
              className={"ml-0"}
              disabled={stateLoading}
            >
              {LaptopManager.getLaptopStateList().map((state) => (
                <Select.Option key={state} value={state}>
                  <LaptopStateTag state={state} />
                </Select.Option>
              ))}
            </Select>
          </div>
          <Button
            onClick={() => setSaleCreateOpen(true)}
            type="primary"
            className={"mr-2"}
            size={"small"}
            disabled={LaptopManager.getFinalStates().includes(laptop.state)}
          >
            Create Sale
          </Button>
          <Popconfirm
            title="Delete this laptop?"
            okText="Delete"
            okButtonProps={{ danger: true }}
            cancelText="Cancel"
            placement="left"
            onConfirm={handleDelete}
            disabled={isDeleting}
          >
            <Button danger size={"small"} loading={isDeleting}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      </header>
      <div className={"flex mb-3"}>
        <CharacteristicsBlock laptop={laptop} setLaptop={setLaptop} />
        <TechCheckBlock laptop={laptop} setLaptop={setLaptop} />
      </div>
      <div className={"flex mb-3"}>
        <ImageManager
          entityType="laptop"
          entityId={laptop._id}
          entity={laptop}
          setEntity={setLaptop}
          cardClassName={"w-2/4 mr-3"}
        />
        <DefectsBlock laptop={laptop} setLaptop={setLaptop} />
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
