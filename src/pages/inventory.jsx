import { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import Loading from "../components/loading.jsx";
import StockService from "../api/services/stock-service.js";
import LaptopService from "../api/services/laptop-service.js";
import InventoryTableHeader from "../components/inventory/inventory-table-header.jsx";
import CreateStockModal from "../components/inventory/create-stock-modal.jsx";
import StockManager from "../helpers/stock-manager.js";
import FilterBar from "../components/inventory/filter-bar.jsx";
import StockStateTag from "../components/common/stock-state-tag.jsx";
import SorterBar from "../components/inventory/sorter-bar.jsx";
import { Link } from "react-router-dom";

export default function Inventory() {
  document.title = "Inventory";
  const [stocks, setStocks] = useState([]);
  const [filters, setFilters] = useState({});
  const [sorters, setSorters] = useState({});
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [filters, sorters]);

  async function fetchData() {
    setIsLoading(true);
    const loadedStocks = await loadStocks();
    let loadedLaptops = await loadLaptops(loadedStocks);
    prepareDataSource(loadedStocks, loadedLaptops);
    setIsLoading(false);
  }

  function prepareDataSource(loadedStocks, loadedLaptops) {
    const newStocks = loadedStocks.map((stock) => {
      return {
        ...stock,
        laptopName: loadedLaptops.find((laptop) => laptop._id === stock.laptopId)?.name,
      };
    });
    setStocks(newStocks);
  }

  async function loadStocks() {
    const stocksDto = await StockService.list({ ...filters, sorters });
    return stocksDto.itemList;
  }

  async function loadLaptops(loadedStocks) {
    const laptops = await LaptopService.list({
      idList: Array.from(new Set(loadedStocks.map((stock) => stock.laptopId))),
    });
    return laptops.itemList;
  }

  const getColumns = () => {
    return [
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
        render: (code) => <Typography.Text code>{code || "-"}</Typography.Text>,
      },
      {
        title: "Title",
        dataIndex: "name",
        key: "name",
        render: (name, record) => {
          const label = name || record.code || "-";
          return (
            <Typography.Text>
              <Link to={`/inventory/stock/${record._id}`}>{label}</Link>
            </Typography.Text>
          );
        },
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        render: (state) => <StockStateTag state={state} />,
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (type) => <Typography.Text>{StockManager.getStockTypeLabel(type)}</Typography.Text>,
      },
      {
        title: "Laptop name",
        dataIndex: "laptopName",
        key: "laptopName",
      },
    ];
  };

  if (!stocks) {
    return <Loading />;
  }
  return (
    <div className={"flex-col w-full"}>
      <SorterBar sorters={sorters} setSorters={setSorters} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <Table
        rowKey="_id"
        className={"ml-3"}
        dataSource={stocks}
        size={"small"}
        pagination={false}
        scroll={{ y: 470 }}
        loading={isLoading}
        columns={getColumns()}
        title={() => <InventoryTableHeader onClick={() => setOpenCreateModal(true)} />}
        footer={() => <div className={"text-xs"}>Total stocks: {stocks.length}</div>}
      />

      {/* MODALS */}
      {openCreateModal && (
        <CreateStockModal
          closeCreateModal={() => setOpenCreateModal(false)}
          createModalOpen={openCreateModal}
          handleReload={fetchData}
        />
      )}
    </div>
  );
}
