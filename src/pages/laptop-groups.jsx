import { useEffect, useState } from "react";
import { Button, message, Popconfirm, Table, Typography } from "antd";
import LaptopGroupService from "../api/services/laptop-group-service.js";
import Loading from "../components/loading.jsx";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LaptopManager from "../helpers/laptop-manager.js";

export default function LaptopGroups() {
  document.title = "Laptop Groups";
  const [laptopGroups, setLaptopGroups] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [sorters, setSorters] = useState({});

  useEffect(() => {
    loadLaptopGroups();
  }, [filters, sorters]);

  async function loadLaptopGroups() {
    setIsLoading(true);
    try {
      const groupsDto = await LaptopGroupService.list({ ...filters, sorters });
      setLaptopGroups(groupsDto.itemList);
    } catch (error) {
      message.error("Failed to load laptop groups!");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id) => {
    try {
      await LaptopGroupService.delete(id);
      message.success("Laptop group deleted!");
      await loadLaptopGroups();
    } catch (error) {
      message.error("Failed to delete laptop group!");
    }
  };

  const getResolutionLabel = (resolution) => {
    if (!resolution) return "";
    // Map resolution strings to labels
    const resolutionMap = {
      "1280x720": "HD (1280x720)",
      "1920x1080": "Full HD (1920x1080)",
      "2560x1440": "Quad HD 2K (2560x1440)",
      "3840x2160": "Ultra HD 4K (3840x2160)",
    };
    // Check if it's already a key like "fhd", "hd", etc.
    const resolutionOptions = LaptopManager.getResolutionListOptions();
    const foundOption = resolutionOptions.find((opt) => opt.value === resolution.toLowerCase());
    if (foundOption) {
      return foundOption.label;
    }
    // Check if it's in the format "1920x1080"
    return resolutionMap[resolution] || resolution;
  };

  const getRefreshRateLabel = (refreshRate) => {
    if (!refreshRate) return "";
    // Extract number from strings like "144Hz" or "144"
    const numMatch = refreshRate.toString().match(/\d+/);
    if (numMatch) {
      const num = parseInt(numMatch[0]);
      const refreshRateOptions = LaptopManager.getRefreshRateListOptions();
      const foundOption = refreshRateOptions.find((opt) => opt.value === num.toString());
      if (foundOption) {
        return foundOption.label;
      }
    }
    return refreshRate;
  };

  const getPanelTypeLabel = (panelType) => {
    if (!panelType) return "";
    const panelTypeOptions = LaptopManager.getPanelTypeListOptions();
    const foundOption = panelTypeOptions.find((opt) => opt.value.toLowerCase() === panelType.toLowerCase());
    if (foundOption) {
      return foundOption.label;
    }
    return panelType.toUpperCase();
  };

  const getColumns = () => {
    return [
      {
        title: "Group Name / Identifier",
        key: "groupNameIdentifier",
        width: 300,
        render: (record) => {
          return (
            <div className={"flex flex-col text-xs"}>
              <Typography.Text code className={"text-xs"}>
                {record.groupIdentifier ?? "-"}
              </Typography.Text>
              <div className={"mb-1 ml-1"}>{record.groupName ?? "-"}</div>
            </div>
          );
        },
      },
      {
        title: "Processor",
        dataIndex: "processor",
        key: "processor",
        render: (processor) => {
          return <div className={"flex flex-col text-xs"}>{processor ?? "-"}</div>;
        },
      },
      {
        title: "Videocard",
        dataIndex: "videocard",
        key: "videocard",
        render: (videocard) => {
          return <div className={"flex flex-col text-xs"}>{videocard ?? "-"}</div>;
        },
      },
      {
        title: "Display",
        key: "display",
        width: 250,
        render: (record) => {
          const screenSize = record.screenSize;
          const resolution = getResolutionLabel(record.resolution);
          const panelType = getPanelTypeLabel(record.panelType);
          const refreshRate = getRefreshRateLabel(record.refreshRate);
          const parts = [];
          if (screenSize) parts.push(`${screenSize}"`);
          if (resolution) parts.push(resolution);
          if (panelType) parts.push(panelType);
          if (refreshRate) parts.push(refreshRate);
          return <div className={"text-xs"}>{parts.length > 0 ? parts.join(" ") : "-"}</div>;
        },
      },
      {
        title: "Laptops",
        dataIndex: "itemList",
        key: "itemList",
        width: 100,
        render: (itemList) => {
          return <div className={"flex flex-col text-xs"}>{itemList?.length ?? 0}</div>;
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
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: (record) => {
          return (
            <div className={"w-full flex justify-evenly"}>
              <Link to={`/laptopGroups/groupDetail/${record._id}`}>
                <Button shape="circle" icon={<SearchOutlined />} />
              </Link>
              <Popconfirm
                title={"Are you sure you want to delete this laptop group?"}
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

  if (!laptopGroups) {
    return <Loading />;
  }

  return (
    <div className={"w-full"}>
      <Table
        className={"ml-3"}
        dataSource={laptopGroups.map((group) => ({ ...group, key: group._id }))}
        size={"small"}
        columns={getColumns()}
        pagination={false}
        scroll={{ y: 500 }}
        key={"_id"}
        loading={isLoading}
        footer={() => <div className={"text-xs"}>Total laptop groups: {laptopGroups.length}</div>}
      />
    </div>
  );
}
