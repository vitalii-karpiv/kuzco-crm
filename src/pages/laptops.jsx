import { useEffect, useState } from "react";
import { Button, Image, message, Popconfirm, Table, Select, Typography } from "antd";
import LaptopService from "../api/services/laptop-service.js";
import LaptopGroupService from "../api/services/laptop-group-service.js";
import Loading from "../components/loading.jsx";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LaptopsTableHeader from "../components/laptop/laptops-table-header.jsx";
import CreateLaptopModal from "../components/laptop/create-laptop-modal.jsx";
import SorterBar from "../components/laptop-detail/sorter-bar.jsx";
import FilterBar from "../components/laptop-detail/filter-bar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import LaptopManager from "../helpers/laptop-manager.js";
import LaptopStateTag from "../components/common/laptop-state-tag.jsx";
import LaptopExportHelper from "../helpers/laptop-export-helper.js";

export default function Laptops() {
  document.title = "Laptops";
  const [laptops, setLaptops] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    stateList: LaptopManager.getActiveStates(),
  });
  const [sorters, setSorters] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [addingLaptopId, setAddingLaptopId] = useState(null);

  useEffect(() => {
    loadLaptops();
  }, [filters, sorters]);

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  async function loadLaptops() {
    setIsLoading(true);
    const ordersDto = await LaptopService.list({ ...filters, sorters });
    setLaptops(ordersDto.itemList);
    setIsLoading(false);
  }

  const handleSetState = async (laptopId, newState) => {
    const updatedLaptop = await LaptopService.setState({ id: laptopId, state: newState });

    setLaptops((prev) => prev.map((laptop) => (laptop._id === updatedLaptop._id ? updatedLaptop : laptop)));
  };

  const handleAddToGroup = async (laptopId) => {
    try {
      setAddingLaptopId(laptopId);
      await LaptopGroupService.addLaptop({ laptopId });
      message.success("Laptop added to group!");
      await loadLaptops();
    } catch (error) {
      console.error("Failed to add laptop to group:", error);
      const errorMessage = error?.response?.data?.message ?? "Failed to add laptop to group!";
      message.error(errorMessage);
    } finally {
      setAddingLaptopId(null);
    }
  };

  const handleRemoveFromGroup = async (laptopId, groupId) => {
    try {
      setAddingLaptopId(laptopId);
      await LaptopGroupService.removeLaptop({ laptopId, groupId });
      message.success("Laptop removed from group!");
      await loadLaptops();
    } catch (error) {
      console.error("Failed to remove laptop from group:", error);
      const errorMessage = error?.response?.data?.message ?? "Failed to remove laptop from group!";
      message.error(errorMessage);
    } finally {
      setAddingLaptopId(null);
    }
  };

  function handleCopy(laptop) {
    navigator.clipboard
      .writeText(laptopCharacteristics(laptop))
      .then(() => {
        message.success("Characteristics copied!");
      })
      .catch(() => {
        message.error("Failed to copy.");
      });
  }

  function laptopCharacteristics(laptop) {
    const name = laptop.name;
    const processor = laptop.characteristics?.processor;
    const videocard = laptop.characteristics?.videocard;
    const ssd = laptop.characteristics?.ssd;
    const ram = laptop.characteristics?.ram;
    const displayInfo = LaptopExportHelper.buildDisplayInfo(laptop.characteristics);
    const batteryInfo = LaptopExportHelper.getBatteryInfo(laptop.characteristics);

    return `${name} | ${processor || "not specified"} | ${videocard ? `${videocard}` : "not specified"} | ${ssd ? `${ssd} GB` : "not specified"} | ${ram ? `${ram} GB` : "not specified"} | ${displayInfo} | Battery ${batteryInfo}`;
  }

  const handleExportExcel = () => {
    if (!laptops || laptops.length === 0) {
      message.info("No laptops to export.");
      return;
    }

    try {
      const exported = LaptopExportHelper.exportToExcel(laptops);
      if (exported) {
        message.success("Export ready!");
      }
    } catch (error) {
      message.error("Failed to export laptops.");
    }
  };

  const getColumns = () => {
    return [
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
        width: 100,
        render: (code, record) => {
          return (
            <div className={"flex flex-col text-xs"}>
              <Typography.Text code className={"text-xs"}>
                {code}
              </Typography.Text>
              <Typography.Text underline className={"text-xs"}>
                # {record.serviceTag ?? "N/A"}
              </Typography.Text>
            </div>
          );
        },
      },
      {
        title: "Title",
        dataIndex: "name",
        key: "name",
        render: (name, record) => (
          <div className="flex items-center gap-2">
            {record.imageUrl && (
              <div className="w-8 h-8 rounded-md overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                <Image
                  src={record.imageUrl}
                  alt={name || record.code || "Laptop image"}
                  width={32}
                  height={32}
                  className="!w-full !h-full object-cover"
                  preview={{
                    mask: <span className="text-xs text-white">View</span>,
                  }}
                />
              </div>
            )}
            <Link to={`/laptops/laptopDetail/${record._id}`} className="text-xs">
              {name ?? record.code ?? "-"}
            </Link>
          </div>
        ),
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        width: 160,
        render: (state, record) => (
          <Select
            value={state}
            variant={"borderless"}
            placement={"bottomRight"}
            suffixIcon={null}
            popupClassName={"min-w-44"}
            onChange={(newState) => handleSetState(record._id, newState)}
          >
            {LaptopManager.getLaptopStateList().map((stateKey) => (
              <Select.Option key={stateKey} value={stateKey} label={LaptopManager.getLaptopStateLabel(stateKey)}>
                <LaptopStateTag state={stateKey} />
              </Select.Option>
            ))}
          </Select>
        ),
      },
      {
        title: "Marketplaces",
        dataIndex: "marketplaces",
        key: "marketplaces",
        width: 120,
        render: (marketplaces) => {
          return marketplaces.map((marketplace) => {
            const color = marketplace.published ? "bg-green-50" : "bg-rose-50";
            return (
              <div key={marketplace} className={`flex flex-col text-xs ${color}`}>
                {marketplace.name}
              </div>
            );
          });
        },
      },
      {
        title: "Note",
        dataIndex: "note",
        key: "note",
        render: (note) => {
          return <div className={"flex flex-col text-xs"}>{note ?? "-"}</div>;
        },
      },
      {
        title: "Pricing",
        dataIndex: "limitPrice",
        key: "limitPrice",
        width: 100,
        render: (limitPrice, record) => {
          return (
            <div className={"flex flex-col text-xs"}>
              <div>Limit: {limitPrice ?? "-"}</div>
              <div>Sell: {record.sellPrice ?? "-"}</div>
            </div>
          );
        },
      },
      {
        title: "Group",
        key: "group",
        width: 180,
        fixed: "right",
        render: (record) => {
          const hasGroup = Boolean(record.laptopGroupId);
          return (
            <div className="flex gap-2 text-xs">
              {hasGroup ? (
                <Link to={`/laptopGroups/groupDetail/${record.laptopGroupId}`} className="text-xs">
                  View group
                </Link>
              ) : (
                <Typography.Text type="secondary" className="text-xs">
                  Not grouped
                </Typography.Text>
              )}
              <div className="flex gap-2">
                {!hasGroup ? (
                  <Button
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={() => handleAddToGroup(record._id)}
                    loading={addingLaptopId === record._id}
                    title="Add to group"
                    size={"small"}
                  />
                ) : (
                  <Popconfirm
                    title={"Remove laptop from the current group?"}
                    onConfirm={() => handleRemoveFromGroup(record._id, record.laptopGroupId)}
                    okText={"Yes"}
                    cancelText="No"
                  >
                    <Button
                      shape="circle"
                      icon={<MinusOutlined />}
                      loading={addingLaptopId === record._id}
                      title="Remove from group"
                      danger
                      size={"small"}
                    />
                  </Popconfirm>
                )}
              </div>
            </div>
          );
        },
      },
    ];
  };

  if (!laptops) {
    return <Loading />;
  }
  return (
    <div className={"w-full"}>
      <SorterBar sorters={sorters} setSorters={setSorters} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <Table
        className={"ml-3"}
        dataSource={laptops.map((laptop) => ({ ...laptop, key: laptop._id }))}
        size={"small"}
        columns={getColumns()}
        pagination={false}
        scroll={{ y: 500 }}
        onScroll={() => {
          // TODO: load more data when scrolled to bottom
        }}
        key={"_id"}
        loading={isLoading}
        footer={() => <div className={"text-xs"}>Total laptops: {laptops.length}</div>}
        expandable={{
          expandedRowRender: (laptop) => (
            <div className={"bg-amber-50 m-0"}>
              {` ${laptopCharacteristics(laptop)}`}
              <Button
                className={"ml-2 text-gray-500"}
                size={"small"}
                shape={"circle"}
                onClick={() => {
                  handleCopy(laptop);
                }}
              >
                <FontAwesomeIcon icon={faCopy} />
              </Button>
            </div>
          ),
          rowExpandable: (laptop) => laptop.characteristics,
        }}
        title={() => <LaptopsTableHeader onClick={() => setCreateModalOpen(true)} onExport={handleExportExcel} />}
      />
      {createModalOpen && (
        <CreateLaptopModal createModalOpen={createModalOpen} onClose={closeCreateModal} onReload={loadLaptops} />
      )}
    </div>
  );
}
