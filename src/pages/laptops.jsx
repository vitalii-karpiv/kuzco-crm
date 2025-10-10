import { useEffect, useState } from "react";
import { Button, message, Popconfirm, Table, Select, Typography } from "antd";
import LaptopService from "../api/services/laptop-service.js";
import Loading from "../components/loading.jsx";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LaptopsTableHeader from "../components/laptop/laptops-table-header.jsx";
import CreateLaptopModal from "../components/laptop/create-laptop-modal.jsx";
import SorterBar from "../components/laptop-detail/sorter-bar.jsx";
import FilterBar from "../components/laptop-detail/filter-bar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import LaptopManager from "../helpers/laptop-manager.js";
import LaptopStateTag from "../components/common/laptop-state-tag.jsx";

export default function Laptops() {
  document.title = "Laptops";
  const [laptops, setLaptops] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    stateList: LaptopManager.getActiveStates(),
  });
  const [sorters, setSorters] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);

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

  const handleDelete = async (id) => {
    try {
      await LaptopService.delete(id);
      message.success("Laptop deleted!");
      await loadLaptops();
    } catch (error) {
      message.error("Failed to delete laptop!");
    }
  };

  const handleSetState = async (laptopId, newState) => {
    const updatedLaptop = await LaptopService.setState({ id: laptopId, state: newState });

    setLaptops((prev) => prev.map((laptop) => (laptop._id === updatedLaptop._id ? updatedLaptop : laptop)));
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
    const screenSize = laptop.characteristics?.screenSize;
    const resolution = laptop.characteristics?.resolution;
    const panelType = laptop.characteristics?.panelType;

    return `${name} | ${processor || "not specified"} | ${videocard ? `${videocard}` : "not specified"} | ${ssd ? `${ssd} GB` : "not specified"} | ${ram ? `${ram} GB` : "not specified"} | ${screenSize ? `${screenSize}"` : "not specified"} ${resolution || "not specified"} ${panelType || "not specified"}`;
  }

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
        render: (name) => {
          return <div className={"flex flex-col text-xs"}>{name ?? "-"}</div>;
        },
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        width: 160,
        render: (state, record) => (
          <Select
            defaultValue={state}
            variant={"borderless"}
            placement={"bottomRight"}
            suffixIcon={null}
            popupClassName={"min-w-44"}
            onChange={(newState) => handleSetState(record._id, newState)}
          >
            {LaptopManager.getLaptopStateList().map((state) => (
              <Select.Option key={state} value={state}>
                <LaptopStateTag state={state} />
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
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: (record) => {
          return (
            <div className={"w-full flex justify-evenly"}>
              <Link to={`/laptops/laptopDetail/${record._id}`}>
                <Button shape="circle" icon={<SearchOutlined />} />
              </Link>
              <Popconfirm
                title={"Are you sure you want to delete this laptop?"}
                onConfirm={() => handleDelete(record._id)}
                okText={"Yes"}
                cancelText="No"
              >
                <Button
                  shape="circle"
                  icon={<DeleteOutlined />}
                  className={"hover:!text-red-600  hover:!border-red-700"}
                />
              </Popconfirm>
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
        title={() => <LaptopsTableHeader onClick={() => setCreateModalOpen(true)} />}
      />
      {createModalOpen && (
        <CreateLaptopModal createModalOpen={createModalOpen} onClose={closeCreateModal} onReload={loadLaptops} />
      )}
    </div>
  );
}
