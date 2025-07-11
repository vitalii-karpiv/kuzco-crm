import { useEffect, useState } from "react";
import { Button, message, Popconfirm, Table } from "antd";
import SaleService from "../api/services/sale-service.js";
import SalesTableHeader from "../components/sale/sales-table-header.jsx";
import CreateSaleModal from "../components/sale/create-sale-modal.jsx";
import DateView from "../components/date-view.jsx";
import LaptopService from "../api/services/laptop-service.js";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SaleStateTag from "../components/common/sale-state-tag.jsx";
import FilterAndSorterBar from "../components/sale/filter-and-sorter-bar.jsx";

export default function Sales() {
  document.title = "Sales";
  const [sales, setSales] = useState();
  const [laptops, setLaptops] = useState();
  const [filters, setFilters] = useState({});
  const [sorters, setSorters] = useState({ date: "desc" });
  const [shouldLoadLaptops, setShouldLoadLaptops] = useState(true);
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSales();
  }, [sorters, filters]);

  useEffect(() => {
    if (sales?.length && shouldLoadLaptops) {
      loadLaptops();
    }
  }, [sales]);

  useEffect(() => {
    if (laptops?.length) {
      setLaptopNames();
    }
  }, [laptops]);

  async function loadSales() {
    setIsLoading(true);
    try {
      const salesDtoOut = await SaleService.list({ ...filters, sorters });
      setSales(salesDtoOut.itemList);
      setShouldLoadLaptops(true);
    } catch (e) {
      message.error("Failed to load sales!");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadLaptops() {
    const laptopsDtoOut = await LaptopService.list({ idList: sales.map((sale) => sale.laptopId) });
    setLaptops(laptopsDtoOut.itemList);
  }

  const handleDelete = async (id) => {
    try {
      await SaleService.delete(id);
      message.success("Sale deleted!");
      await loadSales();
      await loadLaptops();
    } catch (error) {
      message.error("Failed to delete sale!");
      console.error(error);
    }
  };

  function handleCloseCreateModal() {
    loadSales();
    setCreateModalOpen(false);
  }

  function setLaptopNames() {
    if (!laptops) return;
    setShouldLoadLaptops(false);
    const updatedSales = sales.map((sale) => {
      const laptop = laptops.find((laptop) => laptop._id === sale.laptopId);
      sale.laptopName = laptop?.name;
      return sale;
    });
    setSales(updatedSales);
  }

  const getColumns = () => {
    return [
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "Laptop name",
        dataIndex: "laptopName",
        key: "laptopName",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (date) => <DateView dateStr={date} />,
      },
      {
        title: "Source",
        dataIndex: "source",
        key: "source",
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        render: (state) => <SaleStateTag state={state} />,
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: (record) => {
          return (
            <div className={"w-full flex justify-evenly"}>
              <Button onClick={() => navigate(`saleDetail/${record._id}`)} shape="circle" icon={<SearchOutlined />} />
              <Popconfirm
                title={"Are you sure you want to delete this sale?"}
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

  return (
    <div className={"flex-col w-full"}>
      <FilterAndSorterBar filters={filters} setFilters={setFilters} sorters={sorters} setSorters={setSorters} />
      {sales && (
        <Table
          className={"ml-3"}
          dataSource={sales}
          size={"small"}
          key={"_id"}
          loading={isLoading}
          scroll={{ y: 500 }}
          pagination={false}
          columns={getColumns()}
          title={() => <SalesTableHeader onClick={() => setCreateModalOpen(true)} />}
        />
      )}
      {createModalOpen && <CreateSaleModal createModalOpen={createModalOpen} onClose={handleCloseCreateModal} />}
    </div>
  );
}
