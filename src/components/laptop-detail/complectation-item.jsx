import { Button, Typography, message } from "antd";
import PropTypes from "prop-types";
import StockManager from "../../helpers/stock-manager.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import StockService from "../../api/services/stock-service.js";
import { useState } from "react";
import AddStockModal from "./add-stock-modal.jsx";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function ComplectationItem({ stockType, stockList, setStockList, laptopId }) {
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const navigate = useNavigate();

  function handleShowAddStockModal() {
    setShowAddStockModal(true);
  }
  function handleCopy() {
    const filteredItems = stockList.filter((item) => item.type === stockType);

    if (filteredItems.length === 0) {
      message.error("No stock items is added");
      return;
    }

    const textToCopy = filteredItems.map((item) => `${item.code} - ${item.name} (${item.price} грн)`).join("\n");

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        message.success("Stock info copied!");
      })
      .catch(() => {
        message.error("Failed to copy.");
      });
  }

  async function handleRemoveStockItem(stockItem) {
    await StockService.update({ id: stockItem._id, state: StockManager.getStockStateMap().FREE });
    setStockList(stockList.filter((item) => item._id !== stockItem._id));
  }

  return (
    <div className={"my-2"}>
      <div className={"flex justify-between align-middle"}>
        <Typography.Title
          level={5}
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          - {StockManager.getStockTypeLabel(stockType)}:
        </Typography.Title>
        <div>
          <Button className={""} size={"small"} onClick={handleShowAddStockModal}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>

          <Button className={""} size={"small"} onClick={handleCopy}>
            <FontAwesomeIcon icon={faCopy} />
          </Button>
        </div>
      </div>
      {stockList
        .filter((stockItem) => stockItem.type === stockType)
        .map((stockItem) => {
          return (
            <div
              className={
                "flex justify-between align-middle border-1 border-indigo-400 bg-indigo-50 rounded p-1 m-1 w-3/4"
              }
              key={stockItem.code}
            >
              <div onClick={() => navigate(`/inventory/stock/${stockItem._id}`)}>
                <Text code>{stockItem.code}</Text>
                <Text strong className={"mx-2"}>
                  {stockItem.name}
                </Text>
                <Text code type="success">
                  {stockItem.price} грн
                </Text>
              </div>
              <div>
                <Button className={""} size={"small"} onClick={() => handleRemoveStockItem(stockItem)}>
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
              </div>
            </div>
          );
        })}

      {showAddStockModal && (
        <AddStockModal
          open={showAddStockModal}
          type={stockType}
          onClose={() => setShowAddStockModal(false)}
          laptopId={laptopId}
          stockList={stockList}
          setStockList={setStockList}
        />
      )}
    </div>
  );
}

ComplectationItem.propTypes = {
  stockType: PropTypes.string.isRequired,
  stockList: PropTypes.array.isRequired,
  setStockList: PropTypes.func.isRequired,
  laptopId: PropTypes.string.isRequired,
};
