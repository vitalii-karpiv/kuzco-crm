import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, Table, Typography, Tag, Space, Descriptions, Divider, Input, Select, message } from "antd";
import LaptopGroupService from "../api/services/laptop-group-service.js";
import LaptopService from "../api/services/laptop-service.js";
import Loading from "../components/loading.jsx";
import LaptopManager from "../helpers/laptop-manager.js";
import LaptopStateTag from "../components/common/laptop-state-tag.jsx";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function LaptopGroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [laptopGroup, setLaptopGroup] = useState();
  const [laptops, setLaptops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLaptopGroup();
  }, [id]);

  useEffect(() => {
    if (laptopGroup?.itemList && laptopGroup.itemList.length > 0) {
      loadLaptops();
    }
  }, [laptopGroup]);

  async function loadLaptopGroup() {
    setIsLoading(true);
    try {
      const group = await LaptopGroupService.get(id);
      document.title = group.groupName || "Laptop Group";
      setLaptopGroup(group);
    } catch (error) {
      console.error("Failed to load laptop group:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadLaptops() {
    try {
      const laptopsDto = await LaptopService.list({ idList: laptopGroup.itemList });
      setLaptops(laptopsDto.itemList || []);
    } catch (error) {
      console.error("Failed to load laptops:", error);
    }
  }

  async function handleSaveProperty(property, value) {
    try {
      let valueToSave = value;
      
      // Convert Select values to API format if needed
      if (property === "resolution" && value) {
        // If it's a short code like "fhd", convert to full format
        const resolutionMap = {
          "hd": "1280x720",
          "fhd": "1920x1080",
          "qhd": "2560x1440",
          "uhd": "3840x2160",
        };
        // If it's already in "1920x1080" format, keep it; otherwise convert
        if (resolutionMap[value]) {
          valueToSave = resolutionMap[value];
        }
      }
      
      if (property === "refreshRate" && value) {
        // Convert to "144Hz" format if it's just a number
        if (typeof value === "string" && /^\d+$/.test(value)) {
          valueToSave = `${value}Hz`;
        }
      }
      
      if (property === "panelType" && value) {
        // Ensure uppercase for consistency
        valueToSave = value.toUpperCase();
      }
      
      const updateData = { id: laptopGroup._id, [property]: valueToSave };
      const updated = await LaptopGroupService.update(updateData);
      setLaptopGroup(updated);
      document.title = updated.groupName || "Laptop Group";
      message.success(`${property === "groupName" ? "Group name" : property === "groupDescription" ? "Description" : property} updated successfully!`);
    } catch (error) {
      console.error("Failed to update:", error);
      message.error(`Failed to update ${property}!`);
    }
  }

  const getResolutionLabel = (resolution) => {
    if (!resolution) return "-";
    const resolutionMap = {
      "1280x720": "HD (1280x720)",
      "1920x1080": "Full HD (1920x1080)",
      "2560x1440": "Quad HD 2K (2560x1440)",
      "3840x2160": "Ultra HD 4K (3840x2160)",
    };
    const resolutionOptions = LaptopManager.getResolutionListOptions();
    const foundOption = resolutionOptions.find((opt) => opt.value === resolution.toLowerCase());
    if (foundOption) {
      return foundOption.label;
    }
    return resolutionMap[resolution] || resolution;
  };

  const getRefreshRateLabel = (refreshRate) => {
    if (!refreshRate) return "-";
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
    if (!panelType) return "-";
    const panelTypeOptions = LaptopManager.getPanelTypeListOptions();
    const foundOption = panelTypeOptions.find((opt) => opt.value.toLowerCase() === panelType.toLowerCase());
    if (foundOption) {
      return foundOption.label;
    }
    return panelType.toUpperCase();
  };

  // Convert API resolution format to Select value
  const getResolutionSelectValue = (resolution) => {
    if (!resolution) return undefined;
    const resolutionMap = {
      "1280x720": "hd",
      "1920x1080": "fhd",
      "2560x1440": "qhd",
      "3840x2160": "uhd",
    };
    // Check if it's already a key like "fhd"
    const resolutionOptions = LaptopManager.getResolutionListOptions();
    const foundOption = resolutionOptions.find((opt) => opt.value === resolution.toLowerCase());
    if (foundOption) {
      return foundOption.value;
    }
    // Check if it's in the format "1920x1080"
    return resolutionMap[resolution] || resolution;
  };

  // Convert API refresh rate format to Select value
  const getRefreshRateSelectValue = (refreshRate) => {
    if (!refreshRate) return undefined;
    const numMatch = refreshRate.toString().match(/\d+/);
    if (numMatch) {
      return numMatch[0]; // Return just the number as string
    }
    return refreshRate;
  };

  if (isLoading || !laptopGroup) {
    return <Loading />;
  }

  const variantColumns = [
    {
      title: "Laptop ID",
      dataIndex: "laptopId",
      key: "laptopId",
      render: (laptopId) => (
        <Typography.Text code className={"text-xs"}>
          {laptopId || "-"}
        </Typography.Text>
      ),
    },
    {
      title: "RAM",
      dataIndex: "ram",
      key: "ram",
      render: (ram) => <span>{ram ? `${ram} GB` : "-"}</span>,
    },
    {
      title: "SSD",
      dataIndex: "ssd",
      key: "ssd",
      render: (ssd) => <span>{ssd ? `${ssd} GB` : "-"}</span>,
    },
    {
      title: "Touch",
      dataIndex: "touch",
      key: "touch",
      render: (touch) => (
        <Tag color={touch ? "green" : "default"}>{touch ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Keyboard Light",
      dataIndex: "keyLight",
      key: "keyLight",
      render: (keyLight) => (
        <Tag color={keyLight ? "blue" : "default"}>{keyLight ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price ? `₴${price.toLocaleString()}` : "-"}</span>,
    },
  ];

  const laptopColumns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (code) => (
        <Typography.Text code className={"text-xs"}>
          {code || "-"}
        </Typography.Text>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <span>{name || "-"}</span>,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (state) => <LaptopStateTag state={state} />,
    },
    {
      title: "Limit Price",
      dataIndex: "limitPrice",
      key: "limitPrice",
      render: (limitPrice) => <span>{limitPrice ? `₴${limitPrice.toLocaleString()}` : "-"}</span>,
    },
    {
      title: "Sell Price",
      dataIndex: "sellPrice",
      key: "sellPrice",
      render: (sellPrice) => <span>{sellPrice ? `₴${sellPrice.toLocaleString()}` : "-"}</span>,
    },
  ];

  return (
    <div className={"block w-full mx-5"}>
      <header className={"flex justify-between items-center mb-4"}>
        <div className={"flex items-center gap-3"}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/laptopGroups")}
            className={"flex items-center"}
          >
            Back
          </Button>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {laptopGroup.groupName}
          </Typography.Title>
          <Typography.Text type="secondary" code>
            {laptopGroup.groupIdentifier}
          </Typography.Text>
        </div>
      </header>

      {/* Basic Info Block */}
      <Card
        bordered={false}
        hoverable={true}
        className={"w-full mb-4"}
        title={<Typography.Title level={4} style={{ margin: 0 }}>Basic Information</Typography.Title>}
      >
        <div className={"block"}>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Group Name: </p>
            <Input
              className={"w-2/3 ml-2"}
              onBlur={(e) => {
                if (e.target.value !== laptopGroup.groupName) {
                  handleSaveProperty("groupName", e.target.value);
                }
              }}
              defaultValue={laptopGroup.groupName}
              size={"small"}
              placeholder="Enter group name"
            />
          </div>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Group Identifier: </p>
            <Typography.Text code className={"w-2/3 ml-2"}>
              {laptopGroup.groupIdentifier || "-"}
            </Typography.Text>
          </div>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Description: </p>
            <TextArea
              rows={3}
              className={"w-2/3 ml-2"}
              onBlur={(e) => {
                if (e.target.value !== laptopGroup.groupDescription) {
                  handleSaveProperty("groupDescription", e.target.value);
                }
              }}
              defaultValue={laptopGroup.groupDescription}
              size={"small"}
              placeholder="Enter description"
            />
          </div>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Processor: </p>
            <span className={"w-2/3 ml-2"}>{laptopGroup.processor || "-"}</span>
          </div>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Videocard: </p>
            <Space className={"w-2/3 ml-2"}>
              {laptopGroup.videocard || "-"}
              {laptopGroup.discrete !== undefined && (
                <Tag color={laptopGroup.discrete ? "purple" : "cyan"}>
                  {laptopGroup.discrete ? "Discrete" : "Integrated"}
                </Tag>
              )}
            </Space>
          </div>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Screen Size: </p>
            <Input
              type="number"
              step="0.1"
              className={"w-2/3 ml-2"}
              onBlur={(e) => {
                const value = e.target.value ? parseFloat(e.target.value) : null;
                if (value !== laptopGroup.screenSize) {
                  handleSaveProperty("screenSize", value);
                }
              }}
              defaultValue={laptopGroup.screenSize}
              size={"small"}
              placeholder="Enter screen size"
              suffix='"'
            />
          </div>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Resolution: </p>
            <Select
              className={"w-2/3 ml-2"}
              value={getResolutionSelectValue(laptopGroup.resolution)}
              onChange={(value) => handleSaveProperty("resolution", value)}
              options={LaptopManager.getResolutionListOptions()}
              size={"small"}
              allowClear
            />
          </div>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Panel Type: </p>
            <Select
              className={"w-2/3 ml-2"}
              value={laptopGroup.panelType ? laptopGroup.panelType.toLowerCase() : undefined}
              onChange={(value) => handleSaveProperty("panelType", value)}
              options={LaptopManager.getPanelTypeListOptions()}
              size={"small"}
              allowClear
            />
          </div>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Refresh Rate: </p>
            <Select
              className={"w-2/3 ml-2"}
              value={getRefreshRateSelectValue(laptopGroup.refreshRate)}
              onChange={(value) => handleSaveProperty("refreshRate", value)}
              options={LaptopManager.getRefreshRateListOptions()}
              size={"small"}
              allowClear
            />
          </div>
          {laptopGroup.note && (
            <div className={"flex mb-3"}>
              <p className={"w-1/4"}>Note: </p>
              <span className={"w-2/3 ml-2"}>{laptopGroup.note}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Variants Block */}
      {laptopGroup.variants && laptopGroup.variants.length > 0 && (
        <Card
          bordered={false}
          hoverable={true}
          className={"w-full mb-4"}
          title={
            <Typography.Title level={4} style={{ margin: 0 }}>
              Variants ({laptopGroup.variants.length})
            </Typography.Title>
          }
        >
          <Table
            dataSource={laptopGroup.variants.map((variant, index) => ({ ...variant, key: index }))}
            columns={variantColumns}
            pagination={false}
            size="small"
            scroll={{ x: true }}
          />
        </Card>
      )}

      {/* Laptops Table */}
      <Card
        bordered={false}
        hoverable={true}
        className={"w-full mb-4"}
        title={
          <Typography.Title level={4} style={{ margin: 0 }}>
            Laptops in Group ({laptops.length})
          </Typography.Title>
        }
      >
        {laptops.length > 0 ? (
          <Table
            dataSource={laptops.map((laptop) => ({ ...laptop, key: laptop._id }))}
            columns={laptopColumns}
            pagination={false}
            size="small"
            scroll={{ x: true }}
            onRow={(record) => {
              return {
                onClick: () => navigate(`/laptops/laptopDetail/${record._id}`),
                style: { cursor: "pointer" },
              };
            }}
          />
        ) : (
          <Typography.Text type="secondary">No laptops in this group</Typography.Text>
        )}
      </Card>
    </div>
  );
}
