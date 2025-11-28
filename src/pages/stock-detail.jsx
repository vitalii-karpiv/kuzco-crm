import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Card, Input, Popconfirm, Select, Space, Typography, message } from "antd";
import { useEffect, useState } from "react";
import StockService from "../api/services/stock-service.js";
import Loading from "../components/loading.jsx";
import StockManager from "../helpers/stock-manager.js";
import LaptopService from "../api/services/laptop-service.js";
import LaptopManager from "../helpers/laptop-manager.js";
import StockStateTag from "../components/common/stock-state-tag.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function StockDetail() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [stock, setStock] = useState();
  const [laptop, setLaptop] = useState({});
  const [laptopList, setLaptopList] = useState([]);
  const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);
  const [basicInfoDraft, setBasicInfoDraft] = useState(null);
  const [isSavingBasicInfo, setIsSavingBasicInfo] = useState(false);
  const [isDeletingStock, setIsDeletingStock] = useState(false);

  useEffect(() => {
    loadStock();
  }, []);

  useEffect(() => {
    if (stock) {
      loadLaptopList();
    }
  }, [stock, id]);

  async function loadStock() {
    const stock = await StockService.get(id);
    document.title = `${stock.code}`;
    if (stock.laptopId) {
      await loadLaptop(stock.laptopId);
    }
    setStock(stock);
    setBasicInfoDraft({
      code: stock.code || "",
      price: stock.price ?? null,
      state: stock.state || null,
      type: stock.type || null,
      laptopId: stock.laptopId || null,
    });
  }

  async function loadLaptopList() {
    const laptopList = await LaptopService.list({ state: LaptopManager.getActiveStates() });
    setLaptopList(laptopList.itemList || []);
  }

  async function loadLaptop(laptopId) {
    const laptop = await LaptopService.get(laptopId);
    setLaptop(laptop);
  }

  function startEditingBasicInfo() {
    if (!stock) return;
    setBasicInfoDraft({
      code: stock.code || "",
      price: stock.price ?? null,
      state: stock.state || null,
      type: stock.type || null,
      laptopId: stock.laptopId || null,
    });
    setIsEditingBasicInfo(true);
  }

  function cancelEditingBasicInfo() {
    if (!stock) return;
    setBasicInfoDraft({
      code: stock.code || "",
      price: stock.price ?? null,
      state: stock.state || null,
      type: stock.type || null,
      laptopId: stock.laptopId || null,
    });
    setIsEditingBasicInfo(false);
  }

  async function saveBasicInfo() {
    if (!stock || !basicInfoDraft) return;
    try {
      setIsSavingBasicInfo(true);

      const dto = {
        id,
        price: basicInfoDraft.price,
        type: basicInfoDraft.type,
        laptopId: basicInfoDraft.laptopId || null,
      };

      const updated = await StockService.update(dto);
      console.log("updated ->", updated);
      setStock(updated);
      setIsEditingBasicInfo(false);
      message.success("Stock updated successfully!");

      if (updated.laptopId) {
        await loadLaptop(updated.laptopId);
      } else {
        setLaptop({});
      }
    } catch (e) {
      console.error(e);
      message.error("Failed to update stock!");
    } finally {
      setIsSavingBasicInfo(false);
    }
  }

  async function handleDeleteStock() {
    if (!stock?._id) return;
    try {
      setIsDeletingStock(true);
      await StockService.delete(stock._id);
      message.success("Stock deleted successfully!");
      navigate("/inventory");
    } catch (e) {
      console.error("Failed to delete stock:", e);
      message.error("Failed to delete stock!");
    } finally {
      setIsDeletingStock(false);
    }
  }

  if (!stock || !basicInfoDraft || !laptopList || (stock.laptopId && !laptop)) {
    return <Loading />;
  }

  return (
    <div className={"block w-full mx-5"}>
      <header className={"flex items-center mb-4"}>
        <Button
          type="text"
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
          onClick={() => navigate("/inventory")}
          className={"flex items-center mr-3"}
        >
          Back
        </Button>
        <Typography.Title level={3} style={{ margin: 0 }}>
          <Typography.Title code level={4} className={"inline mr-2"}>
            {basicInfoDraft.code}
          </Typography.Title>
          {stock.name || "Stock item"}
        </Typography.Title>
      </header>

      <div className={"flex mb-3"}>
        <Card
          bordered={false}
          hoverable={true}
          className={"mr-3 w-full"}
          title={
            <Typography.Title level={4} style={{ margin: 0 }}>
              Basic Info
            </Typography.Title>
          }
          extra={
            <Space size={"small"}>
              {isEditingBasicInfo ? (
                <>
                  <Button size={"small"} onClick={cancelEditingBasicInfo} disabled={isSavingBasicInfo}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    size={"small"}
                    onClick={saveBasicInfo}
                    loading={isSavingBasicInfo}
                    className={"ml-1"}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Button size={"small"} onClick={startEditingBasicInfo}>
                  Edit
                </Button>
              )}
              <Popconfirm
                title="Delete this stock item?"
                okText="Delete"
                okButtonProps={{ danger: true }}
                cancelText="Cancel"
                placement="left"
                onConfirm={handleDeleteStock}
                disabled={isDeletingStock}
              >
                <Button danger size={"small"} loading={isDeletingStock}>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          }
        >
          <div className={"flex mb-2"}>
            <p className={"w-1/4"}>Price:</p>
            <div className={"w-3/4 ml-2"}>
              {isEditingBasicInfo ? (
                <Input
                  className={"w-40"}
                  type={"number"}
                  size={"small"}
                  value={basicInfoDraft.price ?? ""}
                  onChange={(e) =>
                    setBasicInfoDraft((prev) => ({
                      ...prev,
                      price: e.target.value === "" ? null : parseFloat(e.target.value),
                    }))
                  }
                />
              ) : (
                <Typography.Text>{basicInfoDraft.price != null ? `${basicInfoDraft.price} грн` : "-"}</Typography.Text>
              )}
            </div>
          </div>

          <div className={"flex mb-2"}>
            <p className={"w-1/4"}>State:</p>
            <div className={"w-3/4 ml-2"}>
              <StockStateTag state={stock.state} />
            </div>
          </div>

          <div className={"flex mb-2"}>
            <p className={"w-1/4"}>Type:</p>
            <div className={"w-3/4 ml-2"}>
              {isEditingBasicInfo ? (
                <Select
                  className={"w-40"}
                  size={"small"}
                  value={basicInfoDraft.type}
                  onChange={(value) =>
                    setBasicInfoDraft((prev) => ({
                      ...prev,
                      type: value,
                    }))
                  }
                >
                  {Object.values(StockManager.getStockTypeList()).map((type) => (
                    <Select.Option key={type} value={type}>
                      {StockManager.getStockTypeLabel(type)}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Typography.Text>
                  {basicInfoDraft.type ? StockManager.getStockTypeLabel(basicInfoDraft.type) : "-"}
                </Typography.Text>
              )}
            </div>
          </div>

          <div className={"flex mb-2 items-center"}>
            <p className={"w-1/4"}>Laptop:</p>
            <div className={"w-3/4 ml-2 flex items-center gap-2"}>
              {isEditingBasicInfo ? (
                <>
                  <Select
                    className={"w-96"}
                    size={"small"}
                    allowClear
                    value={basicInfoDraft.laptopId || undefined}
                    onChange={(value) =>
                      setBasicInfoDraft((prev) => ({
                        ...prev,
                        laptopId: value || null,
                      }))
                    }
                  >
                    {laptopList.map((item) => (
                      <Select.Option key={item._id} value={item._id}>
                        <Typography.Text code>{item.code}</Typography.Text> {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                  {basicInfoDraft.laptopId && (
                    <Link
                      to={`/laptops/laptopDetail/${basicInfoDraft.laptopId}`}
                      className={"text-xs text-blue-600 hover:text-blue-800"}
                    >
                      Open
                    </Link>
                  )}
                </>
              ) : (
                <>
                  {laptop?._id ? (
                    <div className={"flex items-center gap-2"}>
                      <Typography.Text code>{laptop.code}</Typography.Text>
                      <Typography.Text>{laptop.name}</Typography.Text>
                    </div>
                  ) : (
                    <Typography.Text>-</Typography.Text>
                  )}
                  {laptop?._id && (
                    <Link
                      to={`/laptops/laptopDetail/${laptop._id}`}
                      className={"text-xs text-blue-600 hover:text-blue-800"}
                    >
                      Open
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
