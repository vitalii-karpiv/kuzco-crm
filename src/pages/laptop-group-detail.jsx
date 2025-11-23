import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, Table, Typography, Tag, Space, Input, message, Button, InputNumber, Popconfirm } from "antd";
import LaptopGroupService from "../api/services/laptop-group-service.js";
import LaptopService from "../api/services/laptop-service.js";
import Loading from "../components/loading.jsx";
import LaptopManager from "../helpers/laptop-manager.js";
import LaptopStateTag from "../components/common/laptop-state-tag.jsx";
import { ArrowLeftOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

export default function LaptopGroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [laptopGroup, setLaptopGroup] = useState();
  const [laptops, setLaptops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);
  const [basicInfoDraft, setBasicInfoDraft] = useState({
    title: "",
    groupDescription: "",
    note: "",
  });
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);
  const [variantPriceDraft, setVariantPriceDraft] = useState(null);
  const [savingVariantIndex, setSavingVariantIndex] = useState(null);
  const [isDeletingGroup, setIsDeletingGroup] = useState(false);

  useEffect(() => {
    loadLaptopGroup();
  }, [id]);

  useEffect(() => {
    if (laptopGroup?.itemList && laptopGroup.itemList.length > 0) {
      loadLaptops();
    }
  }, [laptopGroup]);

  useEffect(() => {
    if (laptopGroup && !isEditingBasicInfo) {
      setBasicInfoDraft({
        title: laptopGroup.title || "",
        groupDescription: laptopGroup.groupDescription || "",
        note: laptopGroup.note || "",
      });
    }
  }, [laptopGroup, isEditingBasicInfo]);

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

  function startEditingBasicInfo() {
    setBasicInfoDraft({
      title: laptopGroup.title || "",
      groupDescription: laptopGroup.groupDescription || "",
      note: laptopGroup.note || "",
    });
    setIsEditingBasicInfo(true);
  }

  function cancelEditingBasicInfo() {
    setBasicInfoDraft({
      title: laptopGroup.title || "",
      groupDescription: laptopGroup.groupDescription || "",
      note: laptopGroup.note || "",
    });
    setIsEditingBasicInfo(false);
  }

  async function saveBasicInfo() {
    const updates = [];
    if (basicInfoDraft.title !== (laptopGroup.title || "")) {
      updates.push(handleSaveProperty("title", basicInfoDraft.title));
    }
    if (basicInfoDraft.groupDescription !== (laptopGroup.groupDescription || "")) {
      updates.push(handleSaveProperty("groupDescription", basicInfoDraft.groupDescription));
    }
    if ((basicInfoDraft.note || "") !== (laptopGroup.note || "")) {
      updates.push(handleSaveProperty("note", basicInfoDraft.note));
    }
    if (updates.length === 0) {
      message.info("No changes to save");
      setIsEditingBasicInfo(false);
      return;
    }
    await Promise.all(updates);
    setIsEditingBasicInfo(false);
  }

  async function handleDeleteGroup() {
    if (!laptopGroup?._id) {
      return;
    }
    try {
      setIsDeletingGroup(true);
      await LaptopGroupService.delete(laptopGroup._id);
      message.success("Laptop group deleted successfully!");
      navigate("/laptopGroups");
    } catch (error) {
      console.error("Failed to delete laptop group:", error);
      message.error("Failed to delete laptop group");
    } finally {
      setIsDeletingGroup(false);
    }
  }

  function startEditingVariantPrice(index, currentPrice) {
    setEditingVariantIndex(index);
    setVariantPriceDraft(currentPrice ?? null);
  }

  function cancelEditingVariantPrice() {
    setEditingVariantIndex(null);
    setVariantPriceDraft(null);
  }

  async function saveVariantPrice(index) {
    if (variantPriceDraft === null || variantPriceDraft === undefined) {
      message.warning("Please enter a price before saving");
      return;
    }
    if (!laptopGroup?.variants?.length) {
      return;
    }
    const currentPrice = laptopGroup.variants[index]?.price ?? null;
    if (currentPrice === variantPriceDraft) {
      message.info("Variant price is unchanged");
      cancelEditingVariantPrice();
      return;
    }
    setSavingVariantIndex(index);
    try {
      const updatedVariants = laptopGroup.variants.map((variant, variantIndex) =>
        variantIndex === index ? { ...variant, price: variantPriceDraft } : variant
      );
      const updated = await LaptopGroupService.update({
        id: laptopGroup._id,
        variants: updatedVariants,
      });
      setLaptopGroup(updated);
      message.success("Variant price updated successfully!");
      cancelEditingVariantPrice();
    } catch (error) {
      console.error("Failed to update variant price:", error);
      message.error("Failed to update variant price");
    } finally {
      setSavingVariantIndex(null);
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
      title: "Battery Wear",
      dataIndex: "battery",
      key: "battery",
      render: (battery) => (
        <span>{battery !== undefined && battery !== null ? `${battery}%` : "-"}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price, _record, index) => {
        const isEditingPrice = editingVariantIndex === index;
        if (isEditingPrice) {
          return (
            <Space size={"small"}>
              <InputNumber
                min={0}
                className={"w-32"}
                value={variantPriceDraft}
                onChange={(value) => setVariantPriceDraft(value)}
                formatter={(value) =>
                  value !== undefined && value !== null
                    ? `₴ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : ""
                }
                parser={(value) => (value ? value.replace(/[₴\s,]/g, "") : "")}
              />
              <Button
                type="primary"
                size={"small"}
                onClick={() => saveVariantPrice(index)}
                loading={savingVariantIndex === index}
              >
                Save
              </Button>
              <Button
                size={"small"}
                onClick={cancelEditingVariantPrice}
                disabled={savingVariantIndex === index}
              >
                Cancel
              </Button>
            </Space>
          );
        }
        return (
          <Space size={"small"}>
            <span>{price ? `₴${price.toLocaleString()}` : "-"}</span>
            <Button
              size={"small"}
              type="link"
              onClick={() => startEditingVariantPrice(index, price)}
              disabled={editingVariantIndex !== null}
            >
              Edit
            </Button>
          </Space>
        );
      },
    },
  ];

  const laptopColumns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (code, record) => {
        const codeLabel = code || "-";
        const identifier = record?._id ? `#${record._id}` : "";
        return (
          <div className={"flex flex-col text-xs"}>
            <Typography.Text code className={"text-xs"}>
              {record?._id ? (
                <Link to={`/laptops/laptopDetail/${record._id}`} target="_blank" rel="noopener noreferrer">
                  {codeLabel}
                </Link>
              ) : (
                codeLabel
              )}
            </Typography.Text>
            {identifier && (
              <Typography.Text type="secondary" className={"text-[10px]"}>
                {identifier}
              </Typography.Text>
            )}
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) =>
        record?._id ? (
          <Link to={`/laptops/laptopDetail/${record._id}`} target="_blank" rel="noopener noreferrer">
            {name || record.code || "-"}
          </Link>
        ) : (
          <span>{name || "-"}</span>
        ),
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
        extra={
          <Space size={"small"}>
            {isEditingBasicInfo ? (
              <>
                <Button size={"small"} onClick={cancelEditingBasicInfo}>
                  Cancel
                </Button>
                <Button type="primary" size={"small"} onClick={saveBasicInfo}>
                  Save
                </Button>
              </>
            ) : (
              <Button size={"small"} onClick={startEditingBasicInfo}>
                Edit
              </Button>
            )}
            <Popconfirm
              title="Delete this laptop group?"
              okText="Delete"
              okButtonProps={{ danger: true }}
              cancelText="Cancel"
              placement="left"
              onConfirm={handleDeleteGroup}
              disabled={isDeletingGroup}
            >
              <Button danger size={"small"} loading={isDeletingGroup}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        }
      >
        <div className={"block"}>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Title: </p>
            {isEditingBasicInfo ? (
              <Input
                className={"w-2/3 ml-2"}
                value={basicInfoDraft.title}
                onChange={(e) =>
                  setBasicInfoDraft((prev) => ({ ...prev, title: e.target.value }))
                }
                size={"small"}
                placeholder="Enter title"
              />
            ) : (
              <span className={"w-2/3 ml-2"}>
                {laptopGroup.title && laptopGroup.title.trim().length > 0
                  ? laptopGroup.title
                  : "-"}
              </span>
            )}
          </div>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Description: </p>
            {isEditingBasicInfo ? (
              <TextArea
                rows={3}
                className={"w-2/3 ml-2"}
                value={basicInfoDraft.groupDescription}
                onChange={(e) =>
                  setBasicInfoDraft((prev) => ({ ...prev, groupDescription: e.target.value }))
                }
                size={"small"}
                placeholder="Enter description"
              />
            ) : (
              <span className={"w-2/3 ml-2"}>
                {laptopGroup.groupDescription && laptopGroup.groupDescription.trim().length > 0
                  ? laptopGroup.groupDescription
                  : "-"}
              </span>
            )}
          </div>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Note: </p>
            {isEditingBasicInfo ? (
              <TextArea
                rows={2}
                className={"w-2/3 ml-2"}
                value={basicInfoDraft.note}
                onChange={(e) =>
                  setBasicInfoDraft((prev) => ({ ...prev, note: e.target.value }))
                }
                size={"small"}
                placeholder="Enter note"
              />
            ) : (
              <span className={"w-2/3 ml-2"}>
                {laptopGroup.note && laptopGroup.note.trim().length > 0 ? laptopGroup.note : "-"}
              </span>
            )}
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
            <span className={"w-2/3 ml-2"}>
              {laptopGroup.screenSize ? `${laptopGroup.screenSize}"` : "-"}
            </span>
          </div>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Resolution: </p>
            <span className={"w-2/3 ml-2"}>{getResolutionLabel(laptopGroup.resolution)}</span>
          </div>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Panel Type: </p>
            <span className={"w-2/3 ml-2"}>{getPanelTypeLabel(laptopGroup.panelType)}</span>
          </div>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Refresh Rate: </p>
            <span className={"w-2/3 ml-2"}>{getRefreshRateLabel(laptopGroup.refreshRate)}</span>
          </div>
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
          />
        ) : (
          <Typography.Text type="secondary">No laptops in this group</Typography.Text>
        )}
      </Card>
    </div>
  );
}
