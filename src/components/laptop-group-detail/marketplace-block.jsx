import { useState } from "react";
import { Card, Typography, Switch, Button, Space, message } from "antd";
import PropTypes from "prop-types";
import TextArea from "antd/es/input/TextArea.js";
import { EditOutlined, SaveOutlined, CloseOutlined, ReloadOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import LaptopGroupService from "../../api/services/laptop-group-service.js";

export default function MarketplaceBlock({ laptopGroup = {}, setLaptopGroup }) {
  const [editingMarketplace, setEditingMarketplace] = useState(null);
  const [descriptionDraft, setDescriptionDraft] = useState("");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [loadingStates, setLoadingStates] = useState({
    generate: {},
    toggle: {},
    save: {},
  });

  const getMarketplaceDisplayName = (code) => {
    const nameMap = {
      instagram: "Instagram",
    };
    return nameMap[code] || code;
  };

  async function handleGenerateDescription(marketplaceCode) {
    if (!laptopGroup?._id) return;

    setLoadingStates((prev) => ({ ...prev, generate: { ...prev.generate, [marketplaceCode]: true } }));
    try {
      const updated = await LaptopGroupService.generateMarketplaceDescription({
        id: laptopGroup._id,
        code: marketplaceCode,
      });
      setLaptopGroup(updated);
      message.success("Description generated successfully!");
    } catch (error) {
      console.error("Failed to generate description:", error);
      message.error("Failed to generate description");
    } finally {
      setLoadingStates((prev) => ({ ...prev, generate: { ...prev.generate, [marketplaceCode]: false } }));
    }
  }

  async function handleTogglePublished(marketplaceCode) {
    if (!laptopGroup?._id) return;

    setLoadingStates((prev) => ({ ...prev, toggle: { ...prev.toggle, [marketplaceCode]: true } }));
    try {
      const updated = await LaptopGroupService.toggleMarketplacePublished({
        id: laptopGroup._id,
        code: marketplaceCode,
      });
      setLaptopGroup(updated);
      message.success(
        `Marketplace ${updated.marketplaces.find((m) => m.code === marketplaceCode)?.published ? "published" : "unpublished"}`,
      );
    } catch (error) {
      console.error("Failed to toggle published status:", error);
      message.error("Failed to toggle published status");
    } finally {
      setLoadingStates((prev) => ({ ...prev, toggle: { ...prev.toggle, [marketplaceCode]: false } }));
    }
  }

  function startEditing(marketplaceCode, currentDescription) {
    setEditingMarketplace(marketplaceCode);
    setDescriptionDraft(currentDescription || "");
    // Auto-expand when editing
    setExpandedDescriptions((prev) => ({ ...prev, [marketplaceCode]: true }));
  }

  function toggleDescription(marketplaceCode) {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [marketplaceCode]: !prev[marketplaceCode],
    }));
  }

  function cancelEditing() {
    setEditingMarketplace(null);
    setDescriptionDraft("");
  }

  async function saveDescription(marketplaceCode) {
    if (!laptopGroup?._id) return;

    const marketplace = laptopGroup.marketplaces.find((m) => m.code === marketplaceCode);
    if (!marketplace) return;

    // Check if description actually changed
    if (descriptionDraft === (marketplace.description || "")) {
      message.info("No changes to save");
      cancelEditing();
      return;
    }

    setLoadingStates((prev) => ({ ...prev, save: { ...prev.save, [marketplaceCode]: true } }));
    try {
      const updatedMarketplaces = laptopGroup.marketplaces.map((m) => {
        if (m.code === marketplaceCode) {
          return { ...m, description: descriptionDraft };
        }
        return m;
      });

      const updated = await LaptopGroupService.update({
        id: laptopGroup._id,
        marketplaces: updatedMarketplaces,
      });
      setLaptopGroup(updated);
      message.success("Description updated successfully!");
      cancelEditing();
    } catch (error) {
      console.error("Failed to update description:", error);
      message.error("Failed to update description");
    } finally {
      setLoadingStates((prev) => ({ ...prev, save: { ...prev.save, [marketplaceCode]: false } }));
    }
  }

  const marketplaces = laptopGroup.marketplaces || [];

  return (
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
      {marketplaces.length === 0 ? (
        <Typography.Text type="secondary">No marketplaces configured yet.</Typography.Text>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {marketplaces.map((marketplace) => {
            const isEditing = editingMarketplace === marketplace.code;
            const isGenerating = loadingStates.generate[marketplace.code];
            const isToggling = loadingStates.toggle[marketplace.code];
            const isSaving = loadingStates.save[marketplace.code];

            return (
              <div
                key={marketplace.code}
                className={`p-4 rounded-lg border ${
                  marketplace.published ? "bg-teal-50 border-teal-200" : "bg-rose-50 border-rose-200"
                }`}
              >
                {/* Marketplace Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Typography.Text strong className={marketplace.published ? "text-teal-700" : "text-rose-700"}>
                      {getMarketplaceDisplayName(marketplace.code)}
                    </Typography.Text>
                    <Switch
                      checked={marketplace.published}
                      onChange={() => handleTogglePublished(marketplace.code)}
                      loading={isToggling}
                      disabled={isToggling || isGenerating || isSaving}
                      checkedChildren="Published"
                      unCheckedChildren="Unpublished"
                    />
                  </div>
                  <Button
                    type="primary"
                    icon={<ReloadOutlined />}
                    size="small"
                    onClick={() => handleGenerateDescription(marketplace.code)}
                    loading={isGenerating}
                    disabled={isToggling || isSaving}
                  >
                    Generate Description
                  </Button>
                </div>

                {/* Description Section */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Button
                        type="text"
                        icon={
                          expandedDescriptions[marketplace.code] ? (
                            <UpOutlined style={{ fontSize: "10px" }} />
                          ) : (
                            <DownOutlined style={{ fontSize: "10px" }} />
                          )
                        }
                        size="small"
                        onClick={() => toggleDescription(marketplace.code)}
                        disabled={isEditing}
                        className="p-0 h-auto"
                      >
                        <Typography.Text type="secondary" className="text-xs">
                          Description:
                        </Typography.Text>
                      </Button>
                    </div>
                    {!isEditing ? (
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => startEditing(marketplace.code, marketplace.description)}
                        disabled={isToggling || isGenerating || isSaving}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Space size="small">
                        <Button
                          type="primary"
                          icon={<SaveOutlined />}
                          size="small"
                          onClick={() => saveDescription(marketplace.code)}
                          loading={isSaving}
                          disabled={isToggling || isGenerating}
                        >
                          Save
                        </Button>
                        <Button icon={<CloseOutlined />} size="small" onClick={cancelEditing} disabled={isSaving}>
                          Cancel
                        </Button>
                      </Space>
                    )}
                  </div>

                  {expandedDescriptions[marketplace.code] && (
                    <>
                      {isEditing ? (
                        <TextArea
                          rows={12}
                          value={descriptionDraft}
                          onChange={(e) => setDescriptionDraft(e.target.value)}
                          placeholder="Enter marketplace description..."
                          disabled={isSaving}
                          className="text-sm"
                        />
                      ) : (
                        <div
                          className={`p-3 rounded border bg-white overflow-y-auto ${
                            marketplace.description ? "" : "text-gray-400 italic"
                          }`}
                        >
                          {marketplace.description ? (
                            <Typography.Paragraph style={{ margin: 0, whiteSpace: "pre-wrap" }} className="text-sm">
                              {marketplace.description}
                            </Typography.Paragraph>
                          ) : (
                            <Typography.Text type="secondary" className="text-sm">
                              No description yet. Click &apos;Generate Description&apos; to create one.
                            </Typography.Text>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

MarketplaceBlock.propTypes = {
  laptopGroup: PropTypes.object.isRequired,
  setLaptopGroup: PropTypes.func.isRequired,
};
