import { useEffect, useState } from "react";
import { Image, message, Table } from "antd";
import LaptopGroupService from "../api/services/laptop-group-service.js";
import Loading from "../components/loading.jsx";
import { Link } from "react-router-dom";
import LaptopManager from "../helpers/laptop-manager.js";

export default function LaptopGroups() {
  document.title = "Laptop Groups";
  const [laptopGroups, setLaptopGroups] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [filters] = useState({});
  const [sorters] = useState({});

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
        title: "Group Name",
        key: "groupNameIdentifier",
        width: 300,
        render: (record) => (
          <div className={"text-xs"}>
            <div className={"mb-1 ml-1 flex items-center gap-2"}>
              {record.imageUrl && (
                <div className="w-8 h-8 rounded-md overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                  <Image
                    src={record.imageUrl}
                    alt={record.title || "Group image"}
                    width={32}
                    height={32}
                    className="!w-full !h-full object-cover"
                    preview={{
                      mask: <span className="text-xs text-white">View</span>,
                    }}
                  />
                </div>
              )}
              <Link to={`/laptopGroups/groupDetail/${record._id}`} className="">
                {record.title ?? "-"}
              </Link>
            </div>
          </div>
        ),
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
        key: "laptopsCount",
        width: 100,
        render: (_value, record) => {
          const totalFromGroup = Array.isArray(record.itemList) ? record.itemList.length : 0;
          const totalFromVariants = Array.isArray(record.variants)
            ? record.variants.reduce((sum, variant) => {
                const variantCount = Array.isArray(variant.itemList) ? variant.itemList.length : 0;
                return sum + variantCount;
              }, 0)
            : 0;
          const total = totalFromVariants || totalFromGroup;
          return <div className={"flex flex-col text-xs"}>{total}</div>;
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
    ];
  };

  if (isLoading && !laptopGroups) {
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
