import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Card,
  Table,
  Typography,
  Tag,
  Space,
  Input,
  message,
  Button,
  InputNumber,
  Popconfirm,
  Select,
  Spin,
  Image,
} from "antd";
import LaptopGroupService from "../api/services/laptop-group-service.js";
import LaptopService from "../api/services/laptop-service.js";
import ImageService from "../api/services/image-service.js";
import Loading from "../components/loading.jsx";
import LaptopManager from "../helpers/laptop-manager.js";
import LaptopGroupManager from "../helpers/laptop-group-manager.js";
import LaptopStateTag from "../components/common/laptop-state-tag.jsx";
import LaptopGroupStateTag from "../components/common/laptop-group-state-tag.jsx";
import { ArrowLeftOutlined, LinkOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import ImageManager from "../components/common/image-manager.jsx";

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
  const [stateLoading, setStateLoading] = useState(false);
  const [linkingImages, setLinkingImages] = useState({});
  const [imageManagerRefreshKey, setImageManagerRefreshKey] = useState(0);

  useEffect(() => {
    loadLaptopGroup();
  }, [id]);

  useEffect(() => {
    if (!laptopGroup) {
      setLaptops([]);
      return;
    }

    // Collect laptop IDs from both legacy group.itemList and new variant.itemList structure
    const groupItemIds = Array.isArray(laptopGroup.itemList) ? laptopGroup.itemList : [];
    const variantItemIds = Array.isArray(laptopGroup.variants)
      ? laptopGroup.variants.flatMap((variant) => (Array.isArray(variant.itemList) ? variant.itemList : []))
      : [];

    const idList = Array.from(new Set([...groupItemIds, ...variantItemIds].filter(Boolean)));

    if (idList.length > 0) {
      loadLaptops(idList);
    } else {
      setLaptops([]);
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
      document.title = group.title || group.groupName || "Laptop Group";
      setLaptopGroup(group);
    } catch (error) {
      console.error("Failed to load laptop group:", error);
      message.error("Failed to load laptop group");
    } finally {
      setIsLoading(false);
    }
  }

  async function loadLaptops(idList) {
    try {
      const laptopsDto = await LaptopService.list({ idList });
      setLaptops(laptopsDto.itemList || []);
    } catch (error) {
      console.error("Failed to load laptops:", error);
    }
  }

  async function handleSaveProperty(property, value) {
    try {
      const updateData = { id: laptopGroup._id, [property]: value };
      const updated = await LaptopGroupService.update(updateData);
      setLaptopGroup(updated);
      document.title = updated.title || updated.groupName || "Laptop Group";
      message.success(
        `${property === "title" ? "Title" : property === "groupDescription" ? "Description" : property === "note" ? "Note" : property} updated successfully!`,
      );
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

  async function handleSetState(state) {
    try {
      setStateLoading(true);
      const updated = await LaptopGroupService.setState({ id: laptopGroup._id, state });
      setLaptopGroup(updated);
      message.success(`State updated to ${LaptopGroupManager.getLaptopGroupStateLabel(state)}`);
    } catch (error) {
      console.error("Failed to update state:", error);
      message.error("Failed to update state!");
    } finally {
      setStateLoading(false);
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
        variantIndex === index ? { ...variant, price: variantPriceDraft } : variant,
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

  async function handleLinkImages(laptopId) {
    if (!laptopId || !laptopGroup?._id) {
      message.error("Missing laptop or group information");
      return;
    }

    setLinkingImages((prev) => ({ ...prev, [laptopId]: true }));
    try {
      const result = await ImageService.linkGroup({
        laptopId,
        groupId: laptopGroup._id,
      });
      const imageCount = result?.count || 0;
      if (imageCount > 0) {
        message.success(`Successfully linked ${imageCount} image${imageCount !== 1 ? "s" : ""} to the group`);
        // Refresh ImageManager to show newly linked images
        setImageManagerRefreshKey((prev) => prev + 1);
      } else {
        message.info("No images found for this laptop");
      }
    } catch (error) {
      console.error("Failed to link images:", error);
      message.error("Failed to link images to the group");
    } finally {
      setLinkingImages((prev) => ({ ...prev, [laptopId]: false }));
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
      render: (touch) => <Tag color={touch ? "green" : "default"}>{touch ? "Yes" : "No"}</Tag>,
    },
    {
      title: "Battery Wear",
      dataIndex: "battery",
      key: "battery",
      render: (batteryWear) => {
        if (!batteryWear) {
          return <Tag>-</Tag>;
        }

        const color = LaptopManager.getBatteryWearColor(batteryWear);
        const label = LaptopManager.getBatteryWearLabel(batteryWear);

        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
      render: (condition) => {
        if (!condition) {
          return <Tag>-</Tag>;
        }

        const color = LaptopManager.getLaptopConditionColor(condition);
        const label = LaptopManager.getLaptopConditionLabel(condition);

        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: "Laptops",
      dataIndex: "itemList",
      key: "itemList",
      render: (itemList) => <span>{Array.isArray(itemList) ? itemList.length : 0}</span>,
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
                  value !== undefined && value !== null ? `₴ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
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
              <Button size={"small"} onClick={cancelEditingVariantPrice} disabled={savingVariantIndex === index}>
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
      render: (name, record) => (
        <div className="flex items-center gap-2">
          {record?.imageUrl && (
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
          {record?._id ? (
            <Link
              to={`/laptops/laptopDetail/${record._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
            >
              {name || record.code || "-"}
            </Link>
          ) : (
            <span className="text-xs">{name || "-"}</span>
          )}
          {record?._id && (
            <Button
              type="link"
              size="small"
              icon={<LinkOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleLinkImages(record._id);
              }}
              loading={linkingImages[record._id]}
              disabled={linkingImages[record._id]}
              title="Link laptop images to group"
              className="flex-shrink-0"
            />
          )}
        </div>
      ),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (state) => <LaptopStateTag state={state} />,
    },
    {
      title: "Cost Price",
      dataIndex: "costPrice",
      key: "costPrice",
      render: (costPrice) => <span>{costPrice ? `₴${costPrice.toLocaleString()}` : "-"}</span>,
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
        <div className={"flex items-center"}>
          <div className={"flex items-center mr-4"}>
            <span className={"text-xs text-gray-700 mr-1"}>State:</span>
            <Select
              defaultValue={laptopGroup.state}
              value={laptopGroup.state}
              variant={"filled"}
              placement={"bottomRight"}
              suffixIcon={stateLoading ? <Spin size="small" /> : null}
              popupClassName={"min-w-48"}
              onChange={handleSetState}
              className={"ml-0"}
              disabled={stateLoading}
            >
              {LaptopGroupManager.getLaptopGroupStateList().map((state) => (
                <Select.Option key={state} value={state}>
                  <LaptopGroupStateTag state={state} />
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </header>

      {/* Basic Info Block */}
      <Card
        bordered={false}
        hoverable={true}
        className={"w-full mb-4"}
        title={
          <Typography.Title level={4} style={{ margin: 0 }}>
            Basic Information
          </Typography.Title>
        }
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
                onChange={(e) => setBasicInfoDraft((prev) => ({ ...prev, title: e.target.value }))}
                size={"small"}
                placeholder="Enter title"
              />
            ) : (
              <span className={"w-2/3 ml-2"}>
                {laptopGroup.title && laptopGroup.title.trim().length > 0 ? laptopGroup.title : "-"}
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
                onChange={(e) => setBasicInfoDraft((prev) => ({ ...prev, groupDescription: e.target.value }))}
                size={"small"}
                placeholder="Enter description"
              />
            ) : (
              <span className={"w-2/3 ml-2 whitespace-pre-line"}>
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
                onChange={(e) => setBasicInfoDraft((prev) => ({ ...prev, note: e.target.value }))}
                size={"small"}
                placeholder="Enter note"
              />
            ) : (
              <span className={"w-2/3 ml-2 whitespace-pre-line"}>
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
            <p className={"w-1/4"}>Transformer: </p>
            <span className={"w-2/3 ml-2"}>
              {laptopGroup.isTransformer ? <Tag color="green">Yes</Tag> : <Tag color="purple">No</Tag>}
            </span>
          </div>
          <div className={"flex mb-3"}>
            <p className={"w-1/4"}>Screen Size: </p>
            <span className={"w-2/3 ml-2"}>{laptopGroup.screenSize ? `${laptopGroup.screenSize}"` : "-"}</span>
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

      <div className={"flex mb-4"}>
        <ImageManager
          entityType="laptopGroup"
          entityId={laptopGroup._id}
          entity={laptopGroup}
          setEntity={setLaptopGroup}
          cardTitle="Photos"
          cardClassName={"w-1/2 mr-1"}
          refreshKey={imageManagerRefreshKey}
        />
        <Card
          bordered={false}
          hoverable={true}
          className={"w-1/2 ml-1"}
          title={
            <Typography.Title level={4} style={{ margin: 0 }}>
              Marketplace
            </Typography.Title>
          }
        >
          <Typography.Text type="secondary">Marketplace data will appear here.</Typography.Text>
        </Card>
      </div>

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
            expandable={{
              expandedRowRender: (variant) => {
                const variantItemIds = Array.isArray(variant.itemList) ? variant.itemList : [];
                const variantLaptops = laptops.filter((laptop) => variantItemIds.includes(laptop._id));

                if (!variantLaptops.length) {
                  return (
                    <Typography.Text type="secondary" className={"text-xs"}>
                      No laptops in this variant
                    </Typography.Text>
                  );
                }

                return (
                  <Table
                    dataSource={variantLaptops.map((laptop) => ({ ...laptop, key: laptop._id }))}
                    columns={laptopColumns}
                    pagination={false}
                    size="small"
                    scroll={{ x: true }}
                  />
                );
              },
              rowExpandable: (variant) => Array.isArray(variant.itemList) && variant.itemList.length > 0,
            }}
          />
        </Card>
      )}
    </div>
  );
}
